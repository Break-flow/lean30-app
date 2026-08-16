import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { useProfile } from '@/stores/profile';

export default function Index() {
  const router = useRouter();
  const onboarded = useProfile((s) => s.onboarded);

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace(onboarded ? '/(app)' : '/onboarding');
    }, 60);
    return () => clearTimeout(t);
  }, [onboarded, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0F0D', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#C6F135', fontSize: 40, fontWeight: '700' }}>Lean30</Text>
    </View>
  );
}