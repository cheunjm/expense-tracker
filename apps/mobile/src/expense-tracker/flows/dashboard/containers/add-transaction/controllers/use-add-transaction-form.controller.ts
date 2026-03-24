import { useState, useCallback } from 'react';
import { useExpenseTrackerStore } from '../../../../../models';
import type { AddTransactionFormState, AddTransactionFormErrors } from '../models';
import type { TransactionType } from '../../../../../models';

const INITIAL_FORM_STATE: AddTransactionFormState = {
  amount: '',
  type: 'expense',
  categoryId: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  isRecurring: false,
};

export const useAddTransactionFormController = () => {
  const [form, setForm] = useState<AddTransactionFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<AddTransactionFormErrors>({});
  const addTransaction = useExpenseTrackerStore((s) => s.addTransaction);
  const categories = useExpenseTrackerStore((s) => s.categories);

  const updateField = useCallback(<K extends keyof AddTransactionFormState>(
    field: K,
    value: AddTransactionFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: AddTransactionFormErrors = {};
    const parsedAmount = Number(form.amount);

    if (!form.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }
    if (!form.categoryId) {
      newErrors.categoryId = 'Select a category';
    }
    if (!form.description.trim()) {
      newErrors.description = 'Enter a description';
    }
    if (!form.date) {
      newErrors.date = 'Enter a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const submit = useCallback(() => {
    if (!validate()) return;

    addTransaction({
      amount: Number(form.amount),
      type: form.type,
      categoryId: form.categoryId,
      description: form.description.trim(),
      date: new Date(form.date).toISOString(),
      isRecurring: form.isRecurring,
    });

    setForm(INITIAL_FORM_STATE);
    setErrors({});
  }, [form, validate, addTransaction]);

  const setType = useCallback((type: TransactionType) => {
    updateField('type', type);
  }, [updateField]);

  return {
    form,
    errors,
    categories,
    updateField,
    setType,
    submit,
  };
};
