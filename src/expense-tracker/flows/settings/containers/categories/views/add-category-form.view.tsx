import { memo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';

type AddCategoryFormViewProps = {
  name: string;
  icon: string;
  color: string;
  onNameChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onAdd: () => void;
};

export const AddCategoryFormView = memo(({
  name,
  icon,
  color,
  onNameChange,
  onIconChange,
  onColorChange,
  onAdd,
}: AddCategoryFormViewProps) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Add Category</Text>
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={onNameChange}
      placeholder="Name"
      placeholderTextColor={ColorTokens.outline}
    />
    <TextInput
      style={styles.input}
      value={icon}
      onChangeText={onIconChange}
      placeholder="Icon (emoji)"
      placeholderTextColor={ColorTokens.outline}
    />
    <TextInput
      style={styles.input}
      value={color}
      onChangeText={onColorChange}
      placeholder="Color (#hex)"
      placeholderTextColor={ColorTokens.outline}
    />
    <Pressable style={styles.addButton} onPress={onAdd}>
      <Text style={styles.addButtonText}>Add Category</Text>
    </Pressable>
  </View>
));

AddCategoryFormView.displayName = 'AddCategoryFormView';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...TypographyTokens.titleMedium,
    color: ColorTokens.onBackground,
    marginBottom: 12,
  },
  input: {
    ...TypographyTokens.bodyLarge,
    color: ColorTokens.onSurface,
    backgroundColor: ColorTokens.surfaceVariant,
    borderRadius: ShapeTokens.small,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: ShapeTokens.medium,
    backgroundColor: ColorTokens.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.onPrimary,
  },
});
