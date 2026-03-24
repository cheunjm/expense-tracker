import { memo } from 'react';
import { Slot } from 'expo-router';
import './models/expense-tracker.models';
import './controllers/expense-tracker.controllers';
import './views/expense-tracker.views';
import { useExpenseTrackerLifecycles } from './lifecycles';

export const ExpenseTrackerExperience = memo(() => {
  useExpenseTrackerLifecycles();

  return <Slot />;
});

ExpenseTrackerExperience.displayName = 'ExpenseTrackerExperience';
