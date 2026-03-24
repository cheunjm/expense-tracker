import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createDb } from './db/client';
import { appRouter } from './router';
import { type Context } from './trpc';

export const createApp = (dbPath?: string) => {
  const db = createDb(dbPath);
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: (): Context => ({ db }),
    }),
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return { app, db };
};

const isMainModule = process.argv[1]?.includes('server');

if (isMainModule) {
  const PORT = process.env.PORT ?? 3001;
  const { app } = createApp();
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}
