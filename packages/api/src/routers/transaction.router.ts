import { z } from 'zod';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { transactions } from '../db/schema';

const createTransactionInput = z.object({
  amount: z.number().positive(),
  category_id: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  description: z.string().default(''),
});

const updateTransactionInput = z.object({
  id: z.number().int().positive(),
  amount: z.number().positive().optional(),
  category_id: z.number().int().positive().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
  description: z.string().optional(),
});

const listTransactionInput = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category_id: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

export const transactionRouter = router({
  create: publicProcedure
    .input(createTransactionInput)
    .mutation(({ ctx, input }) => {
      const result = ctx.db
        .insert(transactions)
        .values(input)
        .returning()
        .get();
      return result;
    }),

  list: publicProcedure
    .input(listTransactionInput)
    .query(({ ctx, input }) => {
      const conditions = [];

      if (input.start_date) {
        conditions.push(gte(transactions.date, input.start_date));
      }
      if (input.end_date) {
        conditions.push(lte(transactions.date, input.end_date));
      }
      if (input.category_id) {
        conditions.push(eq(transactions.category_id, input.category_id));
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      return ctx.db
        .select()
        .from(transactions)
        .where(where)
        .orderBy(desc(transactions.date))
        .limit(input.limit)
        .offset(input.offset)
        .all();
    }),

  update: publicProcedure
    .input(updateTransactionInput)
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;

      const existing = ctx.db
        .select()
        .from(transactions)
        .where(eq(transactions.id, id))
        .get();

      if (!existing) {
        throw new Error(`Transaction ${id} not found`);
      }

      const result = ctx.db
        .update(transactions)
        .set({ ...data, updated_at: new Date().toISOString() })
        .where(eq(transactions.id, id))
        .returning()
        .get();
      return result;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(({ ctx, input }) => {
      const existing = ctx.db
        .select()
        .from(transactions)
        .where(eq(transactions.id, input.id))
        .get();

      if (!existing) {
        throw new Error(`Transaction ${input.id} not found`);
      }

      ctx.db
        .delete(transactions)
        .where(eq(transactions.id, input.id))
        .run();

      return { success: true, id: input.id };
    }),
});
