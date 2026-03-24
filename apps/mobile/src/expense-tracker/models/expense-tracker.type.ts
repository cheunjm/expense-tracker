export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: string;
  isRecurring: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Budget = {
  categoryId: string;
  amount: number;
};

export type ExpenseTrackerState = {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  removeTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
  setBudget: (categoryId: string, amount: number) => void;
  removeBudget: (categoryId: string) => void;
};
