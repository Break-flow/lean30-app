import React from 'react';
import { StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';
import { useAppTheme } from '@/theme';
import { type } from '@/theme';

export type TextVariant = keyof typeof type;

interface Props extends TextProps {
  variant?: TextVariant;
  color?: string;
  center?: boolean;
  uppercase?: boolean;
  style?: TextStyle | TextStyle[];
}

export function Text({ variant = 'body', color, center, uppercase, style, children, ...rest }: Props) {
  const theme = useAppTheme();
  return (
    <RNText
      {...rest}
      style={[
        { color: color ?? theme.text },
        type[variant],
        center && styles.center,
        uppercase && styles.upper,
        style as TextStyle,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  upper: { textTransform: 'uppercase' },
});