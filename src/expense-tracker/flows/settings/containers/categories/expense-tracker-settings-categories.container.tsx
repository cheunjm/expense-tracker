import { memo } from 'react';
import { useCategoriesController } from './controllers';
import { CategoriesViews } from './views';

export const ExpenseTrackerSettingsCategoriesContainer = memo(() => {
  const {
    categories,
    name,
    icon,
    color,
    setName,
    setIcon,
    setColor,
    handleAdd,
    handleRemove,
  } = useCategoriesController();

  return (
    <CategoriesViews
      categories={categories}
      name={name}
      icon={icon}
      color={color}
      onNameChange={setName}
      onIconChange={setIcon}
      onColorChange={setColor}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  );
});

ExpenseTrackerSettingsCategoriesContainer.displayName = 'ExpenseTrackerSettingsCategoriesContainer';
