import { create } from 'zustand';
import type { TransactionType } from '../../../models';

type FilterType = 'all' | TransactionType;

type DashboardState = {
  filterType: FilterType;
  filterCategoryId: string | null;
  dateRange: { start: string; end: string };
  setFilterType: (type: FilterType) => void;
  setFilterCategoryId: (id: string | null) => void;
  setDateRange: (range: { start: string; end: string }) => void;
};

const getCurrentMonthRange = (): { start: string; end: string } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  return { start, end };
};

export const useDashboardStore = create<DashboardState>((set) => ({
  filterType: 'all',
  filterCategoryId: null,
  dateRange: getCurrentMonthRange(),
  setFilterType: (filterType) => set({ filterType }),
  setFilterCategoryId: (filterCategoryId) => set({ filterCategoryId }),
  setDateRange: (dateRange) => set({ dateRange }),
}));
