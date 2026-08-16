import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { useI18n } from '@/i18n';
import { useProfile } from '@/stores/profile';
import { useSettings } from '@/stores/settings';
import { usePurchases } from '@/stores/purchases';
import { workouts } from '@/content';
import { challengeDayNumber } from '@/lib/dates';
import { radius, spacing } from '@/theme';

type Phase = 'rest' | 'work';

export default function Workout() {
  const router = useRouter();
  const { t } = useI18n();
  const planStartDate = useProfile((s) => s.planStartDate);
  const lang = useSettings((s) => s.language);
  const isPremium = usePurchases((s) => s.isPremium);
  const [showLock, setShowLock] = useState(false);

  const day = useMemo(() => challengeDayNumber(planStartDate), [planStartDate]);
  const week = day ? Math.ceil(day / 7) : 1;
  const circuit = workouts[(week - 1) % workouts.length] ?? workouts[0];

  const [index, setIndex] = useState(0);
  const [pass, setPass] = useState(0);
  const [phase, setPhase] = useState<Phase>('work');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);

  const exercise = circuit.exercises[index];

  if (!isPremium) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
        <View style={styles.finish}>
          <View style={styles.lockIcon}>
            <Ionicons name="lock-closed" size={40} color="#C6F135" />
          </View>
          <Text variant="display" center style={{ marginTop: 8 }}>
            {t('common.locked')}
          </Text>
          <Text variant="caption" color="#9AA39A" center style={{ marginTop: 6, lineHeight: 21 }}>
            {t('recipe.lockedBody')}
          </Text>
          <View style={styles.finishBtn}>
            <Button label={t('onboarding.goPremium')} onPress={() => setShowLock(true)} />
          </View>
          <Button label={t('common.close')} variant="ghost" onPress={() => router.back()} />
          <LockedOverlay
            visible={showLock}
            onUnlock={() => {
              setShowLock(false);
              router.replace('/paywall');
            }}
            title={t('common.locked')}
            body={t('recipe.lockedBody')}
          />
        </View>
      </SafeAreaView>
    );
  }

  const phaseDuration = useMemo(() => {
    if (!exercise) return 0;
    if (phase === 'rest') return exercise.restSec;
    return exercise.mode === 'time' ? exercise.target.max : 45;
  }, [phase, exercise]);

  const next = () => {
    if (!exercise) return;
    if (phase === 'rest') {
      // go back to work on next exercise
      setPhase('work');
      return;
    }
    if (index < circuit.exercises.length - 1) {
      setIndex(index + 1);
      setPhase('rest');
      setSecondsLeft(circuit.exercises[index + 1].restSec);
      setRunning(false);
    } else if (pass < circuit.passes.max - 1) {
      setPass(pass + 1);
      setIndex(0);
      setPhase('rest');
      setSecondsLeft(circuit.exercises[0].restSec);
      setRunning(false);
    } else {
      setComplete(true);
      setRunning(false);
    }
  };

  useEffect(() => {
    if (!running || complete) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          next();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, complete, phase, index]);

  useEffect(() => {
    if (exercise && phaseDuration > 0) setSecondsLeft(phaseDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?.id, phase]);

  const et = phase === 'work' ? (exercise?.tx[lang] ?? exercise?.tx.en) : undefined;

  if (complete) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
        <View style={styles.finish}>
          <Ionicons name="checkmark-circle" size={64} color="#C6F135" />
          <Text variant="display" center style={{ marginTop: 8 }}>
            {t('workouts.complete')}
          </Text>
          <Text variant="caption" color="#9AA39A" center>
            {circuit.letter} · {pass + 1}/{circuit.passes.max}
          </Text>
          <View style={styles.finishBtn}>
            <Button label={t('common.done')} onPress={() => router.back()} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Ionicons name="chevron-down" size={22} color="#FFFFFF" />
        </Pressable>
        <Text variant="heading">
          {t('workouts.circuit', { letter: circuit.letter })} · {pass + 1}/{circuit.passes.max}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.badge}>
        <Ionicons name="timer-outline" size={14} color="#C6F135" />
        <Text variant="caption" color="#C6F135">
          {t('workouts.passes', { min: circuit.passes.min, max: circuit.passes.max })}
        </Text>
      </View>

      <View style={styles.center}>
        <Text variant="caption" color="#9AA39A" uppercase>
          {phase === 'rest' ? t('workouts.rest') : t('workouts.seconds')} · {index + 1}/{circuit.exercises.length}
        </Text>
        <Text variant="lead" color="#9AA39A" center style={{ marginTop: 8 }}>
          {et?.name}
        </Text>
        <Text variant="caption" color="#6E766E" center style={{ marginTop: 6 }}>
          {et?.instructions}
        </Text>
        <Text variant="display" color="#C6F135" style={styles.timer}>
          {secondsLeft}s
        </Text>
      </View>

      <View style={styles.bottom}>
        <Button
          label={running ? t('workouts.pause') : t('workouts.start')}
          onPress={() => {
            setRunning(!running);
            if (secondsLeft === 0) {
              const d = phase === 'rest' ? exercise.restSec : phaseDuration;
              setSecondsLeft(d);
            }
          }}
        />
        <Button label={t('workouts.finish')} variant="ghost" onPress={() => setComplete(true)} />
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
  badge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(240,79,209,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  timer: { fontSize: 72, marginTop: 24 },
  bottom: { paddingBottom: spacing.lg, gap: spacing.md },
  finish: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lockIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(198,241,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtn: { marginTop: spacing.xl, alignSelf: 'stretch', paddingHorizontal: spacing.xl },
});