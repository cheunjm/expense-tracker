import { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import type { Category } from '../../../../../models';

type CategoryPickerViewProps = {
  categories: Category[];
  selectedId: string;
  error?: string;
  onSelect: (id: string) => void;
};

export const CategoryPickerView = memo(({
  categories,
  selectedId,
  error,
  onSelect,
}: CategoryPickerViewProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>Category</Text>
    <View style={styles.grid}>
      {categories.map((cat) => (
        <Pressable
          key={cat.id}
          style={[
            styles.item,
            selectedId === cat.id && styles.itemSelected,
          ]}
          onPress={() => onSelect(cat.id)}
        >
          <Text style={styles.icon}>{cat.icon}</Text>
          <Text style={styles.name} numberOfLines={1}>{cat.name}</Text>
        </Pressable>
      ))}
    </View>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
));

CategoryPickerView.displayName = 'CategoryPickerView';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.onSurface,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: ShapeTokens.small,
    backgroundColor: ColorTokens.surfaceVariant,
    minWidth: 72,
  },
  itemSelected: {
    backgroundColor: ColorTokens.primaryContainer,
    borderWidth: 1,
    borderColor: ColorTokens.primary,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  name: {
    ...TypographyTokens.labelSmall,
    color: ColorTokens.onSurfaceVariant,
  },
  error: {
    ...TypographyTokens.bodySmall,
    color: ColorTokens.error,
    marginTop: 4,
  },
});
