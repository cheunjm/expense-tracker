import { memo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import { AmountInputView } from './amount-input.view';
import { CategoryPickerView } from './category-picker.view';
import { FormFieldsView } from './form-fields.view';
import type { AddTransactionFormState, AddTransactionFormErrors } from '../models';
import type { Category, TransactionType } from '../../../../../models';

type AddTransactionViewsProps = {
  form: AddTransactionFormState;
  errors: AddTransactionFormErrors;
  categories: Category[];
  onAmountChange: (value: string) => void;
  onCategorySelect: (id: string) => void;
  onDescriptionChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onRecurringToggle: (value: boolean) => void;
  onTypeChange: (type: TransactionType) => void;
  onSubmit: () => void;
};

export const AddTransactionViews = memo(({
  form,
  errors,
  categories,
  onAmountChange,
  onCategorySelect,
  onDescriptionChange,
  onDateChange,
  onRecurringToggle,
  onTypeChange,
  onSubmit,
}: AddTransactionViewsProps) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.title}>Add Transaction</Text>
    <AmountInputView
      value={form.amount}
      error={errors.amount}
      onChange={onAmountChange}
    />
    <FormFieldsView
      description={form.description}
      descriptionError={errors.description}
      date={form.date}
      dateError={errors.date}
      isRecurring={form.isRecurring}
      type={form.type}
      onDescriptionChange={onDescriptionChange}
      onDateChange={onDateChange}
      onRecurringToggle={onRecurringToggle}
      onTypeChange={onTypeChange}
    />
    <CategoryPickerView
      categories={categories}
      selectedId={form.categoryId}
      error={errors.categoryId}
      onSelect={onCategorySelect}
    />
    <Pressable style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitText}>Add</Text>
    </Pressable>
  </ScrollView>
));

AddTransactionViews.displayName = 'AddTransactionViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTokens.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    ...TypographyTokens.headlineSmall,
    color: ColorTokens.onBackground,
    marginBottom: 24,
    marginTop: 8,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: ShapeTokens.medium,
    backgroundColor: ColorTokens.primary,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.onPrimary,
  },
});
