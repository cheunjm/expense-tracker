import { memo } from 'react';
import { Stack } from 'expo-router';
import { ColorTokens } from '../../../src/design-system';
import { useExpenseTrackerSettingsLifecycles } from '../../../src/expense-tracker/flows/settings/lifecycles';

export const SettingsLayout = memo(() => {
  useExpenseTrackerSettingsLifecycles();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: ColorTokens.surface },
        headerTintColor: ColorTokens.primary,
        headerTitleStyle: { color: ColorTokens.onSurface },
        contentStyle: { backgroundColor: ColorTokens.background },
      }}
    />
  );
});

SettingsLayout.displayName = 'SettingsLayout';

export default SettingsLayout;
