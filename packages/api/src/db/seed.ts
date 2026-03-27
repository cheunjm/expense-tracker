import { createDb } from './client';
import { categories } from './schema';

const DEFAULT_CATEGORIES = [
  { name: 'Food', icon: 'restaurant' },
  { name: 'Transport', icon: 'directions-car' },
  { name: 'Shopping', icon: 'shopping-bag' },
  { name: 'Entertainment', icon: 'movie' },
  { name: 'Health', icon: 'local-hospital' },
  { name: 'Education', icon: 'school' },
  { name: 'Bills', icon: 'receipt-long' },
  { name: 'Other', icon: 'more-horiz' },
];

const seed = () => {
  const db = createDb();

  for (const category of DEFAULT_CATEGORIES) {
    db.insert(categories)
      .values(category)
      .onConflictDoNothing()
      .run();
  }

  console.log(`Seeded ${DEFAULT_CATEGORIES.length} default categories`);
};

seed();
