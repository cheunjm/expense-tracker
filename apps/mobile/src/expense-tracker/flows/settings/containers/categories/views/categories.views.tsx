import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens } from '../../../../../../design-system';
import { AddCategoryFormView } from './add-category-form.view';
import { CategoryListView } from './category-list.view';
import type { Category } from '../../../../../models';

type CategoriesViewsProps = {
  categories: Category[];
  name: string;
  icon: string;
  color: string;
  onNameChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export const CategoriesViews = memo(({
  categories,
  name,
  icon,
  color,
  onNameChange,
  onIconChange,
  onColorChange,
  onAdd,
  onRemove,
}: CategoriesViewsProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Categories</Text>
    <AddCategoryFormView
      name={name}
      icon={icon}
      color={color}
      onNameChange={onNameChange}
      onIconChange={onIconChange}
      onColorChange={onColorChange}
      onAdd={onAdd}
    />
    <CategoryListView categories={categories} onRemove={onRemove} />
  </View>
));

CategoriesViews.displayName = 'CategoriesViews';

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
});
