import { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';
import { SummaryCardView } from './summary-card.view';
import type { SummaryCard } from '../models';

type HomeViewsProps = {
  summary: SummaryCard[];
};

export const HomeViews = memo(({ summary }: HomeViewsProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.grid}>
        {summary.map((card) => (
          <SummaryCardView key={card.id} card={card} />
        ))}
      </View>
      <Pressable
        style={styles.settingsButton}
        onPress={() => router.push('/(settings)/categories')}
      >
        <Text style={styles.settingsButtonText}>View Settings</Text>
      </Pressable>
    </View>
  );
});

HomeViews.displayName = 'HomeViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorTokens.background,
  },
  title: {
    ...TypographyTokens.headlineMedium,
    color: ColorTokens.onBackground,
    marginBottom: 24,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  settingsButton: {
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: ColorTokens.surfaceVariant,
    borderRadius: ShapeTokens.medium,
    alignItems: 'center',
  },
  settingsButtonText: {
    ...TypographyTokens.labelLarge,
    color: ColorTokens.primary,
  },
});
