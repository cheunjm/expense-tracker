import { memo } from 'react';
import { Slot } from 'expo-router';
import './models/expense-tracker-settings.models';
import './controllers/expense-tracker-settings.controllers';
import './views/expense-tracker-settings.views';
import { useExpenseTrackerSettingsLifecycles } from './lifecycles';

export const ExpenseTrackerSettingsFlow = memo(() => {
  useExpenseTrackerSettingsLifecycles();

  return <Slot />;
});

ExpenseTrackerSettingsFlow.displayName = 'ExpenseTrackerSettingsFlow';
