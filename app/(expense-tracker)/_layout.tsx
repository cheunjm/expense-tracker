import { memo } from 'react';
import { Stack } from 'expo-router';
import { useExpenseTrackerLifecycles } from '../../src/expense-tracker/lifecycles';

export const ExpenseTrackerLayout = memo(() => {
  useExpenseTrackerLifecycles();

  return <Stack screenOptions={{ headerShown: false }} />;
});

ExpenseTrackerLayout.displayName = 'ExpenseTrackerLayout';

export default ExpenseTrackerLayout;
