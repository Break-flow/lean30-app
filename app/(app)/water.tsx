import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ProgressRing, RingCenterLabel } from '@/components/ui/ProgressRing';
import { useI18n } from '@/i18n';
import { useWater } from '@/stores/water';
import { useProfile } from '@/stores/profile';
import { spacing } from '@/theme';

export default function WaterModal() {
  const router = useRouter();
  const { t } = useI18n();
  const current = useWater((s) => s.current);
  const addGlass = useWater((s) => s.addGlass);
  const removeGlass = useWater((s) => s.removeGlass);
  const resetToday = useWater((s) => s.resetToday);
  const startWeight = useProfile((s) => s.startWeight);
  const [goal] = useState(() => useWater.getState().dailyGoal(startWeight ?? 70));

  const progress = goal > 0 ? current / goal : 0;
  const glasses = Math.floor(current / 250);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Ionicons name="close" size={22} color="#FFFFFF" />
        </Pressable>
        <Text variant="heading">{t('water.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.center}>
        <ProgressRing
          progress={progress}
          size={220}
          strokeWidth={18}
          center={
            <RingCenterLabel value={`${(current / 1000).toFixed(2)}`} unit="L" />
          }
        />
        <Text variant="caption" color="#9AA39A" style={{ marginTop: 16 }}>
          {t('water.dosing', { weight: startWeight ?? 70 })} · {current}/{goal} ml
        </Text>

        <View style={styles.controls}>
          <Pressable style={styles.btnOutline} onPress={removeGlass}>
            <Ionicons name="remove" size={24} color="#FFFFFF" />
          </Pressable>
          <View style={styles.glasses}>
            <Text variant="display" color="#C6F135">
              {glasses}
            </Text>
            <Text variant="caption" color="#9AA39A">
              250 ml
            </Text>
          </View>
          <Pressable style={styles.btnAdd} onPress={addGlass}>
            <Ionicons name="add" size={24} color="#0A0F0A" />
          </Pressable>
        </View>

        <Text variant="caption" color="#6E766E">
          {t('water.add')}
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button label={t('water.reset')} variant="ghost" onPress={resetToday} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0F0D', paddingHorizontal: spacing.xl },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 28, marginTop: spacing.xl },
  btnOutline: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#C6F135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glasses: { alignItems: 'center', gap: 2, minWidth: 70 },
  bottom: { paddingBottom: spacing.lg },
});