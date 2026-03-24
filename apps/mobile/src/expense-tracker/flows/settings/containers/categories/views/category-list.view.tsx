import { memo } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens, ElevationTokens } from '../../../../../../design-system';
import type { Category } from '../../../../../models';

type CategoryListViewProps = {
  categories: Category[];
  onRemove: (id: string) => void;
};

export const CategoryListView = memo(({ categories, onRemove }: CategoryListViewProps) => (
  <FlatList
    data={categories}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Pressable onPress={() => onRemove(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    )}
    ListEmptyComponent={
      <Text style={styles.emptyText}>No categories</Text>
    }
  />
));

CategoryListView.displayName = 'CategoryListView';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: ShapeTokens.medium,
    marginBottom: 8,
    ...ElevationTokens.level1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: ShapeTokens.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
  },
  name: {
    ...TypographyTokens.bodyLarge,
    color: ColorTokens.onSurface,
    flex: 1,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: ShapeTokens.small,
    backgroundColor: ColorTokens.surfaceVariant,
  },
  deleteText: {
    ...TypographyTokens.labelSmall,
    color: ColorTokens.error,
  },
  emptyText: {
    ...TypographyTokens.bodyMedium,
    color: ColorTokens.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 32,
  },
});
