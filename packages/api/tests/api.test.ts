import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server';
import { runMigrations } from '../src/db/migrate';
import { existsSync, unlinkSync, mkdirSync } from 'fs';
import { join } from 'path';

const TEST_DB_DIR = join(__dirname, '..', 'data');
const TEST_DB_PATH = join(TEST_DB_DIR, 'test.db');

let app: ReturnType<typeof createApp>['app'];

beforeAll(() => {
  if (existsSync(TEST_DB_PATH)) {
    unlinkSync(TEST_DB_PATH);
  }
  if (!existsSync(TEST_DB_DIR)) {
    mkdirSync(TEST_DB_DIR, { recursive: true });
  }
  runMigrations(TEST_DB_PATH);
  const result = createApp(TEST_DB_PATH);
  app = result.app;
});

afterAll(() => {
  if (existsSync(TEST_DB_PATH)) {
    unlinkSync(TEST_DB_PATH);
  }
});

describe('Health check', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Category router', () => {
  it('creates a category', async () => {
    const res = await request(app)
      .post('/trpc/category.create')
      .send({ name: 'Food', icon: 'restaurant' });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toMatchObject({
      name: 'Food',
      icon: 'restaurant',
    });
  });

  it('creates a second category', async () => {
    const res = await request(app)
      .post('/trpc/category.create')
      .send({ name: 'Transport', icon: 'directions-car' });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toMatchObject({ name: 'Transport' });
  });

  it('rejects duplicate category name', async () => {
    const res = await request(app)
      .post('/trpc/category.create')
      .send({ name: 'Food', icon: 'restaurant' });

    expect(res.status).toBe(500);
  });

  it('lists categories', async () => {
    const res = await request(app).get('/trpc/category.list');

    expect(res.status).toBe(200);
    expect(res.body.result.data.length).toBeGreaterThanOrEqual(2);
  });

  it('rejects empty category name', async () => {
    const res = await request(app)
      .post('/trpc/category.create')
      .send({ name: '', icon: 'test' });

    expect(res.status).toBe(400);
  });
});

describe('Transaction router', () => {
  let transactionId: number;

  it('creates a transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.create')
      .send({
        amount: 25.50,
        category_id: 1,
        date: '2024-03-20',
        description: 'Lunch',
      });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toMatchObject({
      amount: 25.50,
      category_id: 1,
      date: '2024-03-20',
      description: 'Lunch',
    });
    transactionId = res.body.result.data.id;
  });

  it('creates a second transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.create')
      .send({
        amount: 15.00,
        category_id: 2,
        date: '2024-03-21',
        description: 'Bus fare',
      });

    expect(res.status).toBe(200);
  });

  it('lists transactions', async () => {
    const res = await request(app).get('/trpc/transaction.list?input=%7B%7D');

    expect(res.status).toBe(200);
    expect(res.body.result.data.length).toBe(2);
  });

  it('lists transactions with date filter', async () => {
    const input = encodeURIComponent(JSON.stringify({ start_date: '2024-03-21' }));
    const res = await request(app).get(`/trpc/transaction.list?input=${input}`);

    expect(res.status).toBe(200);
    expect(res.body.result.data.length).toBe(1);
    expect(res.body.result.data[0].description).toBe('Bus fare');
  });

  it('lists transactions with category filter', async () => {
    const input = encodeURIComponent(JSON.stringify({ category_id: 1 }));
    const res = await request(app).get(`/trpc/transaction.list?input=${input}`);

    expect(res.status).toBe(200);
    expect(res.body.result.data.length).toBe(1);
    expect(res.body.result.data[0].description).toBe('Lunch');
  });

  it('updates a transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.update')
      .send({
        id: transactionId,
        amount: 30.00,
        description: 'Dinner',
      });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toMatchObject({
      id: transactionId,
      amount: 30.00,
      description: 'Dinner',
    });
  });

  it('rejects update for non-existent transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.update')
      .send({ id: 9999, amount: 10.00 });

    expect(res.status).toBe(500);
  });

  it('deletes a transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.delete')
      .send({ id: transactionId });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toEqual({ success: true, id: transactionId });
  });

  it('rejects delete for non-existent transaction', async () => {
    const res = await request(app)
      .post('/trpc/transaction.delete')
      .send({ id: transactionId });

    expect(res.status).toBe(500);
  });

  it('rejects negative amount', async () => {
    const res = await request(app)
      .post('/trpc/transaction.create')
      .send({
        amount: -10,
        category_id: 1,
        date: '2024-03-20',
      });

    expect(res.status).toBe(400);
  });

  it('rejects invalid date format', async () => {
    const res = await request(app)
      .post('/trpc/transaction.create')
      .send({
        amount: 10,
        category_id: 1,
        date: '03/20/2024',
      });

    expect(res.status).toBe(400);
  });
});

describe('Budget router', () => {
  it('sets a budget for a category', async () => {
    const res = await request(app)
      .post('/trpc/budget.set')
      .send({
        category_id: 1,
        amount_limit: 500.00,
      });

    expect(res.status).toBe(200);
    expect(res.body.result.data).toMatchObject({
      category_id: 1,
      amount_limit: 500.00,
    });
  });

  it('updates existing budget (upsert)', async () => {
    const res = await request(app)
      .post('/trpc/budget.set')
      .send({
        category_id: 1,
        amount_limit: 600.00,
      });

    expect(res.status).toBe(200);
    expect(res.body.result.data.amount_limit).toBe(600.00);
  });

  it('lists budgets', async () => {
    const res = await request(app).get('/trpc/budget.list');

    expect(res.status).toBe(200);
    expect(res.body.result.data.length).toBe(1);
    expect(res.body.result.data[0].amount_limit).toBe(600.00);
  });

  it('rejects negative budget limit', async () => {
    const res = await request(app)
      .post('/trpc/budget.set')
      .send({
        category_id: 1,
        amount_limit: -100,
      });

    expect(res.status).toBe(400);
  });
});
