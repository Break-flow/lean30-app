import { Tabs } from 'expo-router';
import { BottomTabBar } from '@/components/nav/BottomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="nutricao" />
      <Tabs.Screen name="treino" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}