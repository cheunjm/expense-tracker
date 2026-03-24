import { useState, useCallback } from 'react';
import { useExpenseTrackerStore } from '../../../../../models';

export const useCategoriesController = () => {
  const categories = useExpenseTrackerStore((s) => s.categories);
  const addCategory = useExpenseTrackerStore((s) => s.addCategory);
  const removeCategory = useExpenseTrackerStore((s) => s.removeCategory);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');

  const handleAdd = useCallback(() => {
    if (!name.trim() || !icon.trim() || !color.trim()) return;

    addCategory({ name: name.trim(), icon: icon.trim(), color: color.trim() });
    setName('');
    setIcon('');
    setColor('');
  }, [name, icon, color, addCategory]);

  const handleRemove = useCallback((id: string) => {
    removeCategory(id);
  }, [removeCategory]);

  return {
    categories,
    name,
    icon,
    color,
    setName,
    setIcon,
    setColor,
    handleAdd,
    handleRemove,
  };
};
