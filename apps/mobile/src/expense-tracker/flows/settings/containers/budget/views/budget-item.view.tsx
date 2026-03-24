import { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens, ElevationTokens } from '../../../../../../design-system';
import { formatKrw } from '../../../../../../shared/utils';

type BudgetItemViewProps = {
  categoryName: string;
  categoryIcon: string;
  budgetAmount: number;
  spentAmount: number;
  onRemove: () => void;
};

export const BudgetItemView = memo(({
  categoryName,
  categoryIcon,
  budgetAmount,
  spentAmount,
  onRemove,
}: BudgetItemViewProps) => {
  const progress = budgetAmount > 0 ? Math.min(spentAmount / budgetAmount, 1) : 0;
  const isOverBudget = spentAmount > budgetAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{categoryIcon}</Text>
        <Text style={styles.name}>{categoryName}</Text>
        <Pressable onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
      <View style={styles.amounts}>
        <Text style={styles.spent}>
          {formatKrw(spentAmount)} / {formatKrw(budgetAmount)}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
              backgroundColor: isOverBudget ? ColorTokens.expense : ColorTokens.primary,
            },
          ]}
        />
      </View>
    </View>
  );
});

BudgetItemView.displayName = 'BudgetItemView';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: ShapeTokens.medium,
    marginBottom: 12,
    ...ElevationTokens.level1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  name: {
    ...TypographyTokens.bodyLarge,
    color: ColorTokens.onSurface,
    flex: 1,
  },
  removeText: {
    ...TypographyTokens.labelSmall,
    color: ColorTokens.error,
  },
  amounts: {
    marginBottom: 8,
  },
  spent: {
    ...TypographyTokens.bodySmall,
    color: ColorTokens.onSurfaceVariant,
  },
  progressBar: {
    height: 6,
    borderRadius: ShapeTokens.full,
    backgroundColor: ColorTokens.surfaceVariant,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: ShapeTokens.full,
  },
});
