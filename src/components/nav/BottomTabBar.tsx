import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '@/i18n';

const ACTIVE = '#C6F135';
const INACTIVE = '#9AA39A';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  label: string;
}

export function BottomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const tabs: TabItem[] = [
    { name: 'index', icon: 'home-outline', iconActive: 'home', label: t('tabs.home') },
    { name: 'nutricao', icon: 'restaurant-outline', iconActive: 'restaurant', label: t('tabs.nutricao') },
    { name: 'treino', icon: 'barbell-outline', iconActive: 'barbell', label: t('tabs.treino') },
    { name: 'perfil', icon: 'person-outline', iconActive: 'person', label: t('tabs.perfil') },
  ];

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={40} tint="dark" style={styles.blur}>
        <View style={styles.row}>
          {state.routes.map((route: any, index: number) => {
            const focused = state.index === index;
            const item = tabs[index];
            return (
              <Pressable
                key={route.key}
                style={styles.btn}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
              >
                <Ionicons
                  name={focused ? item.iconActive : item.icon}
                  size={22}
                  color={focused ? ACTIVE : INACTIVE}
                />
                <Text
                  style={[
                    styles.label,
                    { color: focused ? ACTIVE : INACTIVE, fontFamily: 'Manrope_700Bold' },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.25, shadowRadius: 14 },
      android: { elevation: 18 },
    }),
  },
  blur: {
    borderTopWidth: 1,
    borderTopColor: '#2A2E29',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    height: 84,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});