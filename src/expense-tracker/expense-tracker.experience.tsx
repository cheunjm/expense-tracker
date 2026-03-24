import { memo } from 'react';
import { Slot } from 'expo-router';
import { useExpenseTrackerLifecycles } from './lifecycles';

export const ExpenseTrackerExperience = memo(() => {
  useExpenseTrackerLifecycles();

  return <Slot />;
});

ExpenseTrackerExperience.displayName = 'ExpenseTrackerExperience';
