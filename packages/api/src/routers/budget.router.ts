import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { budgets } from '../db/schema';

const setBudgetInput = z.object({
  category_id: z.number().int().positive(),
  amount_limit: z.number().positive(),
});

export const budgetRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(budgets).all();
  }),

  set: publicProcedure
    .input(setBudgetInput)
    .mutation(({ ctx, input }) => {
      const existing = ctx.db
        .select()
        .from(budgets)
        .where(eq(budgets.category_id, input.category_id))
        .get();

      if (existing) {
        const result = ctx.db
          .update(budgets)
          .set({
            amount_limit: input.amount_limit,
            updated_at: new Date().toISOString(),
          })
          .where(eq(budgets.category_id, input.category_id))
          .returning()
          .get();
        return result;
      }

      const result = ctx.db
        .insert(budgets)
        .values(input)
        .returning()
        .get();
      return result;
    }),
});
