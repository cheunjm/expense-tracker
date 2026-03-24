import { memo } from 'react';
import { Slot } from 'expo-router';
import { useExpenseTrackerDashboardLifecycles } from './lifecycles';

export const ExpenseTrackerDashboardFlow = memo(() => {
  useExpenseTrackerDashboardLifecycles();

  return <Slot />;
});

ExpenseTrackerDashboardFlow.displayName = 'ExpenseTrackerDashboardFlow';
