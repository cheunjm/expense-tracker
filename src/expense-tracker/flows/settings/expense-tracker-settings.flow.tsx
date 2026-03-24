import { memo } from 'react';
import { Slot } from 'expo-router';
import { useExpenseTrackerSettingsLifecycles } from './lifecycles';

export const ExpenseTrackerSettingsFlow = memo(() => {
  useExpenseTrackerSettingsLifecycles();

  return <Slot />;
});

ExpenseTrackerSettingsFlow.displayName = 'ExpenseTrackerSettingsFlow';
