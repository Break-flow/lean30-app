import React from 'react';
import { StyleSheet, View, ViewStyle, ScrollView } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useAppTheme } from '@/theme';
import { layout } from '@/theme';

interface Props {
  children: React.ReactNode;
  edges?: Edge[];
  scroll?: boolean;
  contentPadding?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
}

export function Screen({
  children,
  edges = ['top'],
  scroll = false,
  contentPadding = true,
  style,
  contentContainerStyle,
  keyboardShouldPersistTaps = 'handled',
}: Props) {
  const theme = useAppTheme();

  const innerStyle = [
    contentPadding ? { paddingHorizontal: layout.contentPadding } : null,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.safe, { backgroundColor: theme.screen }, style]}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={innerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, ...innerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
});