import { memo } from 'react';
import { useTransactionsFilterController } from './controllers';
import { TransactionsViews } from './views';

export const ExpenseTrackerDashboardTransactionsContainer = memo(() => {
  const {
    filteredTransactions,
    categories,
    filterType,
    setFilterType,
    removeTransaction,
  } = useTransactionsFilterController();

  return (
    <TransactionsViews
      transactions={filteredTransactions}
      categories={categories}
      filterType={filterType}
      onFilterChange={setFilterType}
      onRemove={removeTransaction}
    />
  );
});

ExpenseTrackerDashboardTransactionsContainer.displayName = 'ExpenseTrackerDashboardTransactionsContainer';
