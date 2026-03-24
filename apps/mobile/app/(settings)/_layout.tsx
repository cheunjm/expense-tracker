import { memo } from 'react';
import { Stack } from 'expo-router';
import { ColorTokens } from '../../src/design-system';

export const SettingsLayout = memo(() => (
  <Stack
    screenOptions={{
      headerStyle: { backgroundColor: ColorTokens.surface },
      headerTintColor: ColorTokens.primary,
      headerTitleStyle: { color: ColorTokens.onSurface },
      contentStyle: { backgroundColor: ColorTokens.background },
    }}
  />
));

SettingsLayout.displayName = 'SettingsLayout';

export default SettingsLayout;
