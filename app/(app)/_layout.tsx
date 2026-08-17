import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0D0F0D' },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="recipe/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="day/[day]" options={{ presentation: 'card' }} />
      <Stack.Screen name="workout" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="water" options={{ presentation: 'modal', animation: 'fade' }} />
      <Stack.Screen name="shopping" options={{ presentation: 'card' }} />
      <Stack.Screen name="paywall" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="privacy" options={{ presentation: 'card' }} />
      <Stack.Screen name="terms" options={{ presentation: 'card' }} />
      <Stack.Screen name="disclaimer" options={{ presentation: 'card' }} />
    </Stack>
  );
}