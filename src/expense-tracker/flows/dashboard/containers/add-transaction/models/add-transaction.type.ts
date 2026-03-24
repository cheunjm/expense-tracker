import type { TransactionType } from '../../../../../models';

export type AddTransactionFormState = {
  amount: string;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: string;
  isRecurring: boolean;
};

export type AddTransactionFormErrors = {
  amount?: string;
  categoryId?: string;
  description?: string;
  date?: string;
};
