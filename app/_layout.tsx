import { memo } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ColorTokens } from '../src/design-system';

export const RootLayout = memo(() => (
  <SafeAreaProvider>
    <StatusBar style="light" />
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: ColorTokens.background },
      }}
    />
  </SafeAreaProvider>
));

RootLayout.displayName = 'RootLayout';

export default RootLayout;
