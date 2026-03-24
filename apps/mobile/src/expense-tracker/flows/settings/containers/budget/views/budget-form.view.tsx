import { memo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import type { Category } from '../../../../../models';

type BudgetFormViewProps = {
  categories: Category[];
  selectedCategoryId: string;
  amount: string;
  onCategorySelect: (id: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: () => void;
};

export const BudgetFormView = memo(({
  categories,
  selectedCategoryId,
  amount,
  onCategorySelect,
  onAmountChange,
  onSubmit,
}: BudgetFormViewProps) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Set Budget</Text>
    <View style={styles.categoryRow}>
      {categories.map((cat) => (
        <Pressable
          key={cat.id}
          style={[
            styles.categoryChip,
            selectedCategoryId === cat.id && styles.categoryChipActive,
          ]}
          onPress={() => onCategorySelect(cat.id)}
        >
          <Text style={styles.categoryIcon}>{cat.icon}</Text>
        </Pressable>
      ))}
    </View>
    <TextInput
      style={styles.input}
      value={amount}
      onChangeText={onAmountChange}
      placeholder="Budget amount (KRW)"
      placeholderTextColor={ColorTokens.outline}
      keyboardType="numeric"
    />
    <Pressable style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitText}>Set Budget</Text>
    </Pressable>
  </View>
));

BudgetFormView.displayName = 'BudgetFormView';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...TypographyTokens.titleMedium,
    color: ColorTokens.onBackground,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  categoryChip: {
    width: 44,
    height: 44,
    borderRadius: ShapeTokens.full,
    backgroundColor: ColorTokens.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: ColorTokens.primaryContainer,
    borderWidth: 1,
    borderColor: ColorTokens.primary,
  },
  categoryIcon: {
    fontSize: 18,
  },
  input: {
    ...TypographyTokens.bodyLarge,
    color: ColorTokens.onSurface,
    backgroundColor: ColorTokens.surfaceVariant,
    borderRadius: ShapeTokens.small,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: ShapeTokens.medium,
    backgroundColor: ColorTokens.primary,
    alignItems: 'center',
  },
  submitText: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.onPrimary,
  },
});
