import type { Transaction, TransactionType } from '../../../../../models';

export type FilterType = 'all' | TransactionType;

export type TransactionsFilterState = {
  filteredTransactions: Transaction[];
  filterType: FilterType;
  filterCategoryId: string | null;
  setFilterType: (type: FilterType) => void;
  setFilterCategoryId: (id: string | null) => void;
};
