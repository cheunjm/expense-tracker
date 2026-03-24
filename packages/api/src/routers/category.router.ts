import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { categories } from '../db/schema';

const createCategoryInput = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().min(1).max(50).default('receipt'),
});

export const categoryRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(categories).all();
  }),

  create: publicProcedure
    .input(createCategoryInput)
    .mutation(({ ctx, input }) => {
      const result = ctx.db
        .insert(categories)
        .values(input)
        .returning()
        .get();
      return result;
    }),
});
