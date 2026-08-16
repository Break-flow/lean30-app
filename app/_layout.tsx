import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Poppins_300Light, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { initI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { configureNotifications } from '@/lib/notifications';
import { useWater } from '@/stores/water';
import { usePurchases } from '@/stores/purchases';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_300Light,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const [ready, setReady] = useState(false);
  const hydrated = useSettings((s) => s.hydrated);
  const mode = useSettings((s) => s.mode);

  useEffect(() => {
    (async () => {
      await Promise.all([
        initI18n(),
        Promise.all([
          useSettings.getState().hydrate(),
          useWater.getState().hydrate(),
          usePurchases.getState().init(),
        ]),
      ]);
      setReady(true);
    })().catch(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready && fontsLoaded && hydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready, fontsLoaded, hydrated]);

  useEffect(() => {
    configureNotifications().catch(() => {});
  }, []);

  if (!ready || !fontsLoaded || !hydrated) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: mode === 'dark' ? '#0D0F0D' : '#F6F5F0' },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(app)" />
      </Stack>
    </GestureHandlerRootView>
  );
}