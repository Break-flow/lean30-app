import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/theme';
import { radius, spacing } from '@/theme';
import { Text } from './Text';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'gold';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  haptic?: boolean;
}

const GREEN_GRADIENT: readonly [string, string] = ['#C6F135', '#5BA829'];
const PINK_GRADIENT: readonly [string, string] = ['#F04FD1', '#B83AA0'];

export function Button({ label, onPress, variant = 'primary', disabled, loading, style, haptic = true }: Props) {
  const theme = useAppTheme();

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          opacity: pressed ? 0.88 : disabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        style,
      ]}
    >
      {variant === 'primary' && (
        <LinearGradient
          colors={GREEN_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fill}
        />
      )}
      {variant === 'gold' && (
        <LinearGradient
          colors={PINK_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fill}
        />
      )}
      {variant === 'ghost' && (
        <View style={[styles.ghostFill, { borderColor: theme.borderStrong }]} />
      )}
      <Text
        variant="title"
        color={
          variant === 'primary'
            ? theme.onPrimary
            : variant === 'gold'
              ? '#FFFFFF'
              : theme.text
        }
        center
      >
        {loading ? '…' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
  },
  fill: { ...StyleSheet.absoluteFill },
  ghostFill: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1.5,
    borderRadius: radius.pill,
  },
});