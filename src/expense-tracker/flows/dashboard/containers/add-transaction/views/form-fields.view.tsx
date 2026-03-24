import { memo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import type { TransactionType } from '../../../../../models';

type FormFieldsViewProps = {
  description: string;
  descriptionError?: string;
  date: string;
  dateError?: string;
  isRecurring: boolean;
  type: TransactionType;
  onDescriptionChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onRecurringToggle: (value: boolean) => void;
  onTypeChange: (type: TransactionType) => void;
};

const TYPE_OPTIONS: { key: TransactionType; label: string }[] = [
  { key: 'expense', label: 'Expense' },
  { key: 'income', label: 'Income' },
];

export const FormFieldsView = memo(({
  description,
  descriptionError,
  date,
  dateError,
  isRecurring,
  type,
  onDescriptionChange,
  onDateChange,
  onRecurringToggle,
  onTypeChange,
}: FormFieldsViewProps) => (
  <View style={styles.container}>
    <View style={styles.typeRow}>
      {TYPE_OPTIONS.map((opt) => (
        <Pressable
          key={opt.key}
          style={[
            styles.typeButton,
            type === opt.key && styles.typeButtonActive,
          ]}
          onPress={() => onTypeChange(opt.key)}
        >
          <Text
            style={[
              styles.typeButtonText,
              type === opt.key && styles.typeButtonTextActive,
            ]}
          >
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>

    <Text style={styles.label}>Description</Text>
    <TextInput
      style={styles.input}
      value={description}
      onChangeText={onDescriptionChange}
      placeholder="What was this for?"
      placeholderTextColor={ColorTokens.outline}
    />
    {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}

    <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
    <TextInput
      style={styles.input}
      value={date}
      onChangeText={onDateChange}
      placeholder="2026-03-24"
      placeholderTextColor={ColorTokens.outline}
    />
    {dateError ? <Text style={styles.error}>{dateError}</Text> : null}

    <Pressable
      style={styles.toggleRow}
      onPress={() => onRecurringToggle(!isRecurring)}
    >
      <View style={[styles.toggle, isRecurring && styles.toggleActive]}>
        {isRecurring ? <View style={styles.toggleDot} /> : null}
      </View>
      <Text style={styles.toggleLabel}>Recurring</Text>
    </Pressable>
  </View>
));

FormFieldsView.displayName = 'FormFieldsView';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: ShapeTokens.small,
    backgroundColor: ColorTokens.surfaceVariant,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: ColorTokens.primaryContainer,
  },
  typeButtonText: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.onSurfaceVariant,
  },
  typeButtonTextActive: {
    color: ColorTokens.primary,
  },
  label: {
    ...TypographyTokens.labelMedium,
    color: ColorTokens.onSurface,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    ...TypographyTokens.bodyLarge,
    color: ColorTokens.onSurface,
    backgroundColor: ColorTokens.surfaceVariant,
    borderRadius: ShapeTokens.small,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  error: {
    ...TypographyTokens.bodySmall,
    color: ColorTokens.error,
    marginTop: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  toggle: {
    width: 40,
    height: 24,
    borderRadius: ShapeTokens.full,
    backgroundColor: ColorTokens.surfaceVariant,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: ColorTokens.primary,
    alignItems: 'flex-end',
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: ShapeTokens.full,
    backgroundColor: ColorTokens.onPrimary,
  },
  toggleLabel: {
    ...TypographyTokens.bodyMedium,
    color: ColorTokens.onSurface,
  },
});
