import { useMemo } from 'react';
import { useExpenseTrackerStore } from '../../../../../models';
import { useDashboardStore } from '../../../models';

export const useTransactionsFilterController = () => {
  const transactions = useExpenseTrackerStore((s) => s.transactions);
  const removeTransaction = useExpenseTrackerStore((s) => s.removeTransaction);
  const categories = useExpenseTrackerStore((s) => s.categories);
  const filterType = useDashboardStore((s) => s.filterType);
  const filterCategoryId = useDashboardStore((s) => s.filterCategoryId);
  const setFilterType = useDashboardStore((s) => s.setFilterType);
  const setFilterCategoryId = useDashboardStore((s) => s.setFilterCategoryId);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filterType !== 'all') {
      result = result.filter((t) => t.type === filterType);
    }

    if (filterCategoryId) {
      result = result.filter((t) => t.categoryId === filterCategoryId);
    }

    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [transactions, filterType, filterCategoryId]);

  return {
    filteredTransactions,
    categories,
    filterType,
    filterCategoryId,
    setFilterType,
    setFilterCategoryId,
    removeTransaction,
  };
};
