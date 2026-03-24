import { memo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ColorTokens, TypographyTokens, ShapeTokens } from '../../../../../../design-system';

type AmountInputViewProps = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const AmountInputView = memo(({ value, error, onChange }: AmountInputViewProps) => (
  <View style={styles.container}>
    <Text style={styles.currencySymbol}>₩</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder="0"
      placeholderTextColor={ColorTokens.outline}
      keyboardType="numeric"
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
));

AmountInputView.displayName = 'AmountInputView';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  currencySymbol: {
    ...TypographyTokens.displaySmall,
    color: ColorTokens.primary,
    position: 'absolute',
    left: 16,
    top: 12,
    zIndex: 1,
  },
  input: {
    ...TypographyTokens.displaySmall,
    color: ColorTokens.onSurface,
    backgroundColor: ColorTokens.surfaceVariant,
    borderRadius: ShapeTokens.medium,
    paddingVertical: 16,
    paddingLeft: 56,
    paddingRight: 16,
  },
  error: {
    ...TypographyTokens.bodySmall,
    color: ColorTokens.error,
    marginTop: 4,
  },
});
