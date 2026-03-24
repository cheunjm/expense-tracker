import { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import type { FilterType } from '../models';

type FilterBarViewProps = {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
};

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
];

export const FilterBarView = memo(({ filterType, onFilterChange }: FilterBarViewProps) => (
  <View style={styles.container}>
    {FILTER_OPTIONS.map((option) => (
      <Pressable
        key={option.key}
        style={[
          styles.chip,
          filterType === option.key && styles.chipActive,
        ]}
        onPress={() => onFilterChange(option.key)}
      >
        <Text
          style={[
            styles.chipText,
            filterType === option.key && styles.chipTextActive,
          ]}
        >
          {option.label}
        </Text>
      </Pressable>
    ))}
  </View>
));

FilterBarView.displayName = 'FilterBarView';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: ShapeTokens.full,
    backgroundColor: ColorTokens.surfaceVariant,
  },
  chipActive: {
    backgroundColor: ColorTokens.primary,
  },
  chipText: {
    ...TypographyTokens.labelMedium,
    color: ColorTokens.onSurfaceVariant,
  },
  chipTextActive: {
    color: ColorTokens.onPrimary,
  },
});
