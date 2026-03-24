import { memo } from 'react';
import { useBudgetController } from './controllers';
import { BudgetViews } from './views';

export const ExpenseTrackerSettingsBudgetContainer = memo(() => {
  const {
    categories,
    budgetsWithSpent,
    selectedCategoryId,
    amount,
    setSelectedCategoryId,
    setAmount,
    handleSetBudget,
    handleRemoveBudget,
  } = useBudgetController();

  return (
    <BudgetViews
      categories={categories}
      budgets={budgetsWithSpent}
      selectedCategoryId={selectedCategoryId}
      amount={amount}
      onCategorySelect={setSelectedCategoryId}
      onAmountChange={setAmount}
      onSetBudget={handleSetBudget}
      onRemoveBudget={handleRemoveBudget}
    />
  );
});

ExpenseTrackerSettingsBudgetContainer.displayName = 'ExpenseTrackerSettingsBudgetContainer';
