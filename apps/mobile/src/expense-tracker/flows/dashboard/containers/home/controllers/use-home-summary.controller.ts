import { useMemo } from 'react';
import { useExpenseTrackerStore } from '../../../../../models';
import { ColorTokens } from '../../../../../../design-system';
import type { SummaryCard } from '../models';

export const useHomeSummaryController = () => {
  const transactions = useExpenseTrackerStore((s) => s.transactions);
  const budgets = useExpenseTrackerStore((s) => s.budgets);

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const budgetRemaining = totalBudget - totalExpense;

    const cards: SummaryCard[] = [
      { id: 'balance', label: 'Balance', amount: totalBalance, icon: '\uD83D\uDCB3', color: ColorTokens.primary },
      { id: 'income', label: 'Income', amount: totalIncome, icon: '\uD83D\uDCB0', color: ColorTokens.income },
      { id: 'expense', label: 'Expense', amount: totalExpense, icon: '\uD83D\uDCB8', color: ColorTokens.expense },
      { id: 'budget', label: 'Budget Left', amount: budgetRemaining, icon: '\uD83C\uDFAF', color: ColorTokens.tertiary },
    ];

    return cards;
  }, [transactions, budgets]);

  return { summary };
};
