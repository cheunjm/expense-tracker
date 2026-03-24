import { memo } from 'react';
import { Slot } from 'expo-router';
import './models/expense-tracker-dashboard.models';
import './controllers/expense-tracker-dashboard.controllers';
import './views/expense-tracker-dashboard.views';
import { useExpenseTrackerDashboardLifecycles } from './lifecycles';

export const ExpenseTrackerDashboardFlow = memo(() => {
  useExpenseTrackerDashboardLifecycles();

  return <Slot />;
});

ExpenseTrackerDashboardFlow.displayName = 'ExpenseTrackerDashboardFlow';
