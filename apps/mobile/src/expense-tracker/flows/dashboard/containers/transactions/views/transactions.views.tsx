import { memo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens } from '../../../../../../design-system';
import { FilterBarView } from './filter-bar.view';
import { TransactionItemView } from './transaction-item.view';
import type { Transaction, Category } from '../../../../../models';
import type { FilterType } from '../models';

type TransactionsViewsProps = {
  transactions: Transaction[];
  categories: Category[];
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  onRemove: (id: string) => void;
};

export const TransactionsViews = memo(({
  transactions,
  categories,
  filterType,
  onFilterChange,
  onRemove,
}: TransactionsViewsProps) => {
  const categoryMap: Record<string, Category> = {};
  categories.forEach((c) => {
    categoryMap[c.id] = c;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FilterBarView filterType={filterType} onFilterChange={onFilterChange} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItemView
            transaction={item}
            category={categoryMap[item.categoryId]}
            onRemove={onRemove}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet</Text>
        }
      />
    </View>
  );
});

TransactionsViews.displayName = 'TransactionsViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorTokens.background,
  },
  title: {
    ...TypographyTokens.headlineSmall,
    color: ColorTokens.onBackground,
    marginBottom: 16,
    marginTop: 8,
  },
  emptyText: {
    ...TypographyTokens.bodyMedium,
    color: ColorTokens.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 32,
  },
});
