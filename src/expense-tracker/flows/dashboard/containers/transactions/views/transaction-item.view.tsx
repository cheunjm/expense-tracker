import { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens, ElevationTokens } from '../../../../../../design-system';
import { formatKrw } from '../../../../../../shared/utils';
import type { Transaction, Category } from '../../../../../models';

type TransactionItemViewProps = {
  transaction: Transaction;
  category: Category | undefined;
  onRemove: (id: string) => void;
};

export const TransactionItemView = memo(({ transaction, category, onRemove }: TransactionItemViewProps) => {
  const amountColor = transaction.type === 'income' ? ColorTokens.income : ColorTokens.expense;
  const prefix = transaction.type === 'income' ? '+' : '-';

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: category?.color ?? ColorTokens.surfaceVariant }]}>
        <Text style={styles.icon}>{category?.icon ?? '\uD83D\uDCE6'}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={styles.date}>
          {new Date(transaction.date).toLocaleDateString('ko-KR')}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {prefix}{formatKrw(transaction.amount)}
        </Text>
        <Pressable onPress={() => onRemove(transaction.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
});

TransactionItemView.displayName = 'TransactionItemView';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: ShapeTokens.medium,
    marginBottom: 8,
    ...ElevationTokens.level1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: ShapeTokens.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  details: {
    flex: 1,
  },
  description: {
    ...TypographyTokens.bodyMedium,
    color: ColorTokens.onSurface,
  },
  date: {
    ...TypographyTokens.bodySmall,
    color: ColorTokens.onSurfaceVariant,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    ...TypographyTokens.titleSmall,
  },
  removeText: {
    ...TypographyTokens.labelSmall,
    color: ColorTokens.error,
    marginTop: 4,
  },
});
