import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@/theme';
import { radius, spacing } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  elevated?: boolean;
  onPress?: () => void;
  padded?: boolean;
}

export function Card({ children, style, elevated, padded = true }: CardProps) {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: elevated ? theme.cardElevated : 'rgba(255,255,255,0.04)',
          borderColor: theme.border,
        },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: { padding: spacing.lg },
});