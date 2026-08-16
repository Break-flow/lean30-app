import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { ProgressRing, RingCenterLabel } from '@/components/ui/ProgressRing';
import { useWater } from '@/stores/water';
import { useProfile } from '@/stores/profile';
import { useI18n } from '@/i18n';

export function WaterCard({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useI18n();
  const current = useWater((s) => s.current);
  const addGlass = useWater((s) => s.addGlass);
  const removeGlass = useWater((s) => s.removeGlass);
  const startWeight = useProfile((s) => s.startWeight);
  const goal = useWater.getState().dailyGoal(startWeight ?? 70);
  const progress = goal > 0 ? current / goal : 0;
  const liters = Math.round((current / 1000) * 10) / 10;

  return (
    <Pressable onPress={onOpenModal}>
      <Card elevated style={styles.card}>
        <View style={styles.row}>
          <ProgressRing
            progress={progress}
            size={104}
            strokeWidth={9}
            center={<RingCenterLabel value={`${liters}`} unit="L" />}
          />
          <View style={styles.right}>
            <Text variant="eyebrow" color="#C6F135" uppercase>
              {t('water.title')}
            </Text>
            <Text variant="body" color="#9AA39A">
              {t('water.goal')} · {goal} ml
            </Text>
            <View style={styles.actions}>
              <Pressable style={styles.minus} onPress={removeGlass}>
                <Ionicons name="remove" size={18} color="#9AA39A" />
              </Pressable>
              <Pressable style={styles.add} onPress={addGlass}>
                <Ionicons name="add" size={18} color="#0A0F0A" />
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  right: { flex: 1, gap: 6 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  minus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C6F135',
    alignItems: 'center',
    justifyContent: 'center',
  },
});