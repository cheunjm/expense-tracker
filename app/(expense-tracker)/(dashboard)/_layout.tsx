import { memo } from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { ColorTokens, TypographyTokens } from '../../../src/design-system';
import { useExpenseTrackerDashboardLifecycles } from '../../../src/expense-tracker/flows/dashboard/lifecycles';

const HomeIcon = memo(({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>{'\uD83C\uDFE0'}</Text>
));
HomeIcon.displayName = 'HomeIcon';

const TransactionsIcon = memo(({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>{'\uD83D\uDCCB'}</Text>
));
TransactionsIcon.displayName = 'TransactionsIcon';

const AddIcon = memo(({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>{'\u2795'}</Text>
));
AddIcon.displayName = 'AddIcon';

export const DashboardLayout = memo(() => {
  useExpenseTrackerDashboardLifecycles();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: ColorTokens.surface,
          borderTopColor: ColorTokens.surfaceVariant,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: ColorTokens.primary,
        tabBarInactiveTintColor: ColorTokens.onSurfaceVariant,
        tabBarLabelStyle: {
          ...TypographyTokens.labelSmall,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: TransactionsIcon,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: AddIcon,
        }}
      />
    </Tabs>
  );
});

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
