import { router } from './trpc';
import { transactionRouter } from './routers/transaction.router';
import { categoryRouter } from './routers/category.router';
import { budgetRouter } from './routers/budget.router';

export const appRouter = router({
  transaction: transactionRouter,
  category: categoryRouter,
  budget: budgetRouter,
});

export type AppRouter = typeof appRouter;
