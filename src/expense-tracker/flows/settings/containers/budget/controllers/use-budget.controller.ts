import { useState, useCallback, useMemo } from 'react';
import { useExpenseTrackerStore } from '../../../../../models';

type BudgetWithSpent = {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  budgetAmount: number;
  spentAmount: number;
};

export const useBudgetController = () => {
  const categories = useExpenseTrackerStore((s) => s.categories);
  const budgets = useExpenseTrackerStore((s) => s.budgets);
  const transactions = useExpenseTrackerStore((s) => s.transactions);
  const setBudget = useExpenseTrackerStore((s) => s.setBudget);
  const removeBudget = useExpenseTrackerStore((s) => s.removeBudget);

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [amount, setAmount] = useState('');

  const budgetsWithSpent = useMemo((): BudgetWithSpent[] =>
    budgets.map((b) => {
      const category = categories.find((c) => c.id === b.categoryId);
      const spentAmount = transactions
        .filter((t) => t.type === 'expense' && t.categoryId === b.categoryId)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        categoryId: b.categoryId,
        categoryName: category?.name ?? 'Unknown',
        categoryIcon: category?.icon ?? '\uD83D\uDCE6',
        budgetAmount: b.amount,
        spentAmount,
      };
    }),
  [budgets, categories, transactions]);

  const handleSetBudget = useCallback(() => {
    const parsedAmount = Number(amount);
    if (!selectedCategoryId || isNaN(parsedAmount) || parsedAmount <= 0) return;

    setBudget(selectedCategoryId, parsedAmount);
    setSelectedCategoryId('');
    setAmount('');
  }, [selectedCategoryId, amount, setBudget]);

  const handleRemoveBudget = useCallback((categoryId: string) => {
    removeBudget(categoryId);
  }, [removeBudget]);

  return {
    categories,
    budgetsWithSpent,
    selectedCategoryId,
    amount,
    setSelectedCategoryId,
    setAmount,
    handleSetBudget,
    handleRemoveBudget,
  };
};
