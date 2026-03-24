import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../../shared/utils';
import type { ExpenseTrackerState, Category } from './expense-tracker.type';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-food', name: 'Food', icon: '\uD83C\uDF54', color: '#ff9800' },
  { id: 'cat-transport', name: 'Transport', icon: '\uD83D\uDE97', color: '#2196f3' },
  { id: 'cat-shopping', name: 'Shopping', icon: '\uD83D\uDECD\uFE0F', color: '#e91e63' },
  { id: 'cat-entertainment', name: 'Entertainment', icon: '\uD83C\uDFAC', color: '#9c27b0' },
  { id: 'cat-health', name: 'Health', icon: '\uD83D\uDC8A', color: '#4caf50' },
  { id: 'cat-bills', name: 'Bills', icon: '\uD83D\uDCC4', color: '#f44336' },
  { id: 'cat-salary', name: 'Salary', icon: '\uD83D\uDCB0', color: '#69f0ae' },
  { id: 'cat-other', name: 'Other', icon: '\uD83D\uDCE6', color: '#9e9e9e' },
];

export const useExpenseTrackerStore = create<ExpenseTrackerState>()(
  persist(
    (set) => ({
      transactions: [],
      categories: DEFAULT_CATEGORIES,
      budgets: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: generateId() },
          ],
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      setBudget: (categoryId, amount) =>
        set((state) => {
          const existing = state.budgets.find((b) => b.categoryId === categoryId);
          if (existing) {
            return {
              budgets: state.budgets.map((b) =>
                b.categoryId === categoryId ? { ...b, amount } : b,
              ),
            };
          }
          return {
            budgets: [...state.budgets, { categoryId, amount }],
          };
        }),

      removeBudget: (categoryId) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.categoryId !== categoryId),
        })),
    }),
    {
      name: 'expense-tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
