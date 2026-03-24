import { memo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens } from '../../../../../../design-system';
import { BudgetFormView } from './budget-form.view';
import { BudgetItemView } from './budget-item.view';
import type { Category } from '../../../../../models';

type BudgetWithSpent = {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  budgetAmount: number;
  spentAmount: number;
};

type BudgetViewsProps = {
  categories: Category[];
  budgets: BudgetWithSpent[];
  selectedCategoryId: string;
  amount: string;
  onCategorySelect: (id: string) => void;
  onAmountChange: (value: string) => void;
  onSetBudget: () => void;
  onRemoveBudget: (categoryId: string) => void;
};

export const BudgetViews = memo(({
  categories,
  budgets,
  selectedCategoryId,
  amount,
  onCategorySelect,
  onAmountChange,
  onSetBudget,
  onRemoveBudget,
}: BudgetViewsProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Budgets</Text>
    <BudgetFormView
      categories={categories}
      selectedCategoryId={selectedCategoryId}
      amount={amount}
      onCategorySelect={onCategorySelect}
      onAmountChange={onAmountChange}
      onSubmit={onSetBudget}
    />
    <FlatList
      data={budgets}
      keyExtractor={(item) => item.categoryId}
      renderItem={({ item }) => (
        <BudgetItemView
          categoryName={item.categoryName}
          categoryIcon={item.categoryIcon}
          budgetAmount={item.budgetAmount}
          spentAmount={item.spentAmount}
          onRemove={() => onRemoveBudget(item.categoryId)}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No budgets set</Text>
      }
    />
  </View>
));

BudgetViews.displayName = 'BudgetViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorTokens.background,
  },
  title: {
    ...TypographyTokens.headlineSmall,
    color: ColorTokens.onBackground,
    marginBottom: 24,
    marginTop: 8,
  },
  emptyText: {
    ...TypographyTokens.bodyMedium,
    color: ColorTokens.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 32,
  },
});
