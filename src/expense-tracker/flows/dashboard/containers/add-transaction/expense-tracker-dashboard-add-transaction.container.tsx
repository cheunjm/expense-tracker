import { memo, useCallback } from 'react';
import { useAddTransactionFormController } from './controllers';
import { AddTransactionViews } from './views';
import type { TransactionType } from '../../../../models';

export const ExpenseTrackerDashboardAddTransactionContainer = memo(() => {
  const { form, errors, categories, updateField, setType, submit } = useAddTransactionFormController();

  const handleAmountChange = useCallback((value: string) => {
    updateField('amount', value);
  }, [updateField]);

  const handleCategorySelect = useCallback((id: string) => {
    updateField('categoryId', id);
  }, [updateField]);

  const handleDescriptionChange = useCallback((value: string) => {
    updateField('description', value);
  }, [updateField]);

  const handleDateChange = useCallback((value: string) => {
    updateField('date', value);
  }, [updateField]);

  const handleRecurringToggle = useCallback((value: boolean) => {
    updateField('isRecurring', value);
  }, [updateField]);

  const handleTypeChange = useCallback((type: TransactionType) => {
    setType(type);
  }, [setType]);

  return (
    <AddTransactionViews
      form={form}
      errors={errors}
      categories={categories}
      onAmountChange={handleAmountChange}
      onCategorySelect={handleCategorySelect}
      onDescriptionChange={handleDescriptionChange}
      onDateChange={handleDateChange}
      onRecurringToggle={handleRecurringToggle}
      onTypeChange={handleTypeChange}
      onSubmit={submit}
    />
  );
});

ExpenseTrackerDashboardAddTransactionContainer.displayName = 'ExpenseTrackerDashboardAddTransactionContainer';
