import { memo } from 'react';
import { useHomeSummaryController } from './controllers';
import { HomeViews } from './views';

export const ExpenseTrackerDashboardHomeContainer = memo(() => {
  const { summary } = useHomeSummaryController();

  return <HomeViews summary={summary} />;
});

ExpenseTrackerDashboardHomeContainer.displayName = 'ExpenseTrackerDashboardHomeContainer';
