import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useProfile } from '@/stores/profile';
import { useChallenge } from '@/stores/challenge';
import { usePurchases } from '@/stores/purchases';
import { workouts } from '@/content';
import { challengeDayNumber } from '@/lib/dates';
import { useState } from 'react';
import { radius, spacing } from '@/theme';
import type { AppLanguage } from '@/stores/settings';

export default function Treino() {
  const router = useRouter();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language) as AppLanguage;
  const planStartDate = useProfile((s) => s.planStartDate);
  const progress = useChallenge((s) => s.progress);
  const isPremium = usePurchases((s) => s.isPremium);
  const [showLock, setShowLock] = useState(false);

  const day = useMemo(() => challengeDayNumber(planStartDate), [planStartDate]);
  const week = day ? Math.ceil(day / 7) : 1;
  const circuit = workouts[(week - 1) % workouts.length] ?? workouts[0];

  const start = () => {
    if (!isPremium) {
      setShowLock(true);
      return;
    }
    router.push('/workout');
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="heading">{t('tabs.treino')}</Text>
        <Text variant="caption" color="#9AA39A">
          {t('workouts.title')}
        </Text>
      </View>

      <Card elevated style={styles.circuit}>
        <View style={styles.circuitTop}>
          <View style={styles.letterBadge}>
            <Text variant="display" color="#0A0F0A">
              {circuit.letter}
            </Text>
          </View>
          <View style={styles.circuitInfo}>
            <Text variant="eyebrow" color="#F04FD1" uppercase>
              {t('workouts.circuit', { letter: circuit.letter })} · {t('challenge.week', { n: week })}
            </Text>
            <Text variant="body" color="#9AA39A">
              {t('workouts.passes', { min: circuit.passes.min, max: circuit.passes.max })} · {circuit.exercises.length}{' '}
              {t('recipes.category.treinos')}
            </Text>
          </View>
        </View>

        <View style={styles.exList}>
          {circuit.exercises.map((ex, i) => {
            const tx = ex.tx[lang] ?? ex.tx.en ?? { name: ex.id, instructions: '' };
            const target =
              ex.mode === 'time'
                ? `${ex.target.min}–${ex.target.max}s`
                : t('workouts.reps', { reps: `${ex.target.min}–${ex.target.max}` });
            return (
              <View key={ex.id} style={styles.exRow}>
                <View style={styles.exIndex}>
                  <Text variant="caption" color="#FFFFFF">
                    {i + 1}
                  </Text>
                </View>
                <Text variant="body" color="#FFFFFF" style={styles.exName}>
                  {tx.name}
                </Text>
                <Text variant="caption" color="#F04FD1">
                  {target}
                </Text>
              </View>
            );
          })}
        </View>

        <Button label={t('workouts.start')} variant="gold" onPress={start} style={styles.startBtn} />
      </Card>

      {!isPremium && (
        <Pressable onPress={() => setShowLock(true)} style={styles.lockHint}>
          <Ionicons name="lock-closed" size={16} color="#F04FD1" />
          <Text variant="body" color="#F04FD1">
            {t('recipes.lockedCta')}
          </Text>
        </Pressable>
      )}

      <LockedOverlay
        visible={showLock}
        onClose={() => setShowLock(false)}
        onUnlock={() => {
          setShowLock(false);
          router.push('/paywall');
        }}
        title={t('common.locked')}
        body={t('recipe.lockedBody')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  header: { paddingTop: spacing.lg, gap: 4 },
  circuit: { marginTop: spacing.xl },
  circuitTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  letterBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F04FD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuitInfo: { flex: 1, gap: 4 },
  exList: { gap: spacing.sm },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  exIndex: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(240,79,209,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exName: { flex: 1, lineHeight: 22 },
  startBtn: { marginTop: spacing.lg },
  lockHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
});