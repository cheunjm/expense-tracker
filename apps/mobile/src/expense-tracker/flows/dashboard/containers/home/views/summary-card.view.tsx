import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens, ElevationTokens } from '../../../../../../design-system';
import { formatKrw } from '../../../../../../shared/utils';
import type { SummaryCard } from '../models';

type SummaryCardViewProps = {
  card: SummaryCard;
};

export const SummaryCardView = memo(({ card }: SummaryCardViewProps) => (
  <View style={[styles.card, { borderLeftColor: card.color }]}>
    <Text style={styles.icon}>{card.icon}</Text>
    <Text style={styles.label}>{card.label}</Text>
    <Text style={[styles.amount, { color: card.color }]}>
      {formatKrw(card.amount)}
    </Text>
  </View>
));

SummaryCardView.displayName = 'SummaryCardView';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: ShapeTokens.medium,
    borderLeftWidth: 3,
    ...ElevationTokens.level2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    ...TypographyTokens.labelMedium,
    color: ColorTokens.onSurfaceVariant,
    marginBottom: 4,
  },
  amount: {
    ...TypographyTokens.titleMedium,
  },
});
