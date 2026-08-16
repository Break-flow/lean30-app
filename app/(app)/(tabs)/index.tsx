import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { WaterCard } from '@/components/water/WaterCard';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useProfile } from '@/stores/profile';
import { useChallenge } from '@/stores/challenge';
import { challengeDays, recipesById, getRecipeTx, workouts } from '@/content';
import { challengeDayNumber, currentStreak } from '@/lib/dates';
import { usePurchases } from '@/stores/purchases';
import { radius, spacing } from '@/theme';
import type { AppLanguage } from '@/stores/settings';

export default function Home() {
  const router = useRouter();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language) as AppLanguage;
  const name = useProfile((s) => s.name)?.trim();
  const startWeight = useProfile((s) => s.startWeight);
  const targetWeight = useProfile((s) => s.targetWeight);
  const doneCount = useChallenge((s) => s.doneCount);
  const planStartDate = useProfile((s) => s.planStartDate);
  const progress = useChallenge((s) => s.progress);

  const dayNum = useMemo(() => challengeDayNumber(planStartDate), [planStartDate]);
  const today = useMemo(() => (dayNum ? challengeDays[dayNum - 1] : undefined), [dayNum]);
  const tasks = today?.tasks ?? [];
  const mainMeals = today?.meals ?? [];
  const streak = useMemo(() => currentStreak(progress, planStartDate), [progress, planStartDate]);
  const isPremium = usePurchases((s) => s.isPremium);
  const dayLocked = !isPremium && dayNum != null && dayNum > 1;

  const week = dayNum ? Math.ceil(dayNum / 7) : 1;
  const circuit = workouts[(week - 1) % workouts.length] ?? workouts[0];
  const remaining = dayNum ? Math.max(0, 30 - dayNum) : 30;

  const tipCard = tasks.find((task) => task.type === 'tea');

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.greet}>
          <Text variant="eyebrow" color="#9AA39A" uppercase>
            {t('home.hello')}
          </Text>
          <Text variant="heading" style={styles.hello}>
            {name ? `${name}` : 'Lean30'}
          </Text>
        </View>
        <View style={styles.streakPill}>
          <Ionicons name="flame" size={16} color="#C6F135" />
          <Text variant="title" color="#C6F135">
            {streak}
          </Text>
        </View>
      </View>

      {today && !dayLocked && (
        <Card style={styles.planCard}>
          <View style={styles.planTop}>
            <View style={styles.chipGreen}>
              <Text variant="caption" color="#C6F135" uppercase>
                {t('home.dayOfThirty', { day: dayNum })}
              </Text>
            </View>
            <Text variant="caption" color="#9AA39A">
              {t('home.remainingDays', { n: remaining })}
            </Text>
          </View>
          {mainMeals.map((slot) => {
            const opt = slot.options[0];
            const done = Boolean(progress[dayNum!]?.taskDone?.includes(String(mainMeals.indexOf(slot))));
            return (
              <Pressable
                key={slot.period}
                style={styles.planRow}
                onPress={() => {
                  if (opt.recipeId) router.push(`/recipe/${opt.recipeId}`);
                  else if (opt.category)
                    router.navigate({ pathname: '/(app)/(tabs)/nutricao', params: { cat: opt.category } });
                }}
              >
                <View style={[styles.planCheck, done && styles.planCheckDone]}>
                  <Ionicons name="checkmark" size={13} color={done ? '#0A0F0A' : 'transparent'} />
                </View>
                <View style={styles.planInfo}>
                  <Text variant="caption" color="#9AA39A" uppercase>
                    {t(`challenge.${slot.period}`)}
                  </Text>
                  <Text variant="body" color="#FFFFFF" style={styles.planValue}>
                    {opt.recipeId
                      ? getRecipeTx(recipeById(opt.recipeId), lang)?.title ?? opt.label[lang]
                      : opt.label[lang]}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </Card>
      )}

      {!dayLocked && (
        <View style={styles.sectionHeader}>
          <Text variant="title">{t('home.todayWorkout')}</Text>
          <Pressable onPress={() => router.push('/treino')} hitSlop={8}>
            <Text variant="caption" color="#C6F135">
              {t('day.viewFull')} ›
            </Text>
          </Pressable>
        </View>
      )}

      {!dayLocked && (
        <Pressable
          onPress={() => router.push(isPremium ? '/workout' : '/paywall')}
          style={styles.workoutCard}
        >
          <LinearGradient
            colors={['rgba(240,79,209,0.12)', 'rgba(240,79,209,0.02)']}
            style={styles.workoutGrad}
          >
            <View style={styles.chipPink}>
              <Text variant="caption" color="#F04FD1" uppercase>
                {t('workouts.circuit', { letter: circuit.letter })}
              </Text>
            </View>
            <Text variant="title" color="#FFFFFF" style={styles.workoutTitle}>
              {circuit.exercises.length} {t('home.exercises')}
            </Text>
            <Text variant="body" color="#9AA39A" style={styles.workoutSub}>
              {circuit.exercises
                .slice(0, 3)
                .map((ex) => ex.tx[lang]?.name ?? ex.tx.en?.name ?? ex.id)
                .join(', ')}
              ...
            </Text>
          </LinearGradient>
        </Pressable>
      )}

      {!dayLocked && tipCard && (
        <View style={styles.sectionHeader}>
          <Text variant="title">{t('home.tipOfDay')}</Text>
        </View>
      )}
      {!dayLocked && tipCard && (
        <Card style={styles.tipCard}>
          <Text variant="body" color="#FFFFFF" style={styles.tipTitle}>
            {tipCard.label[lang]}
          </Text>
          <Text variant="caption" color="#9AA39A" style={styles.tipBody}>
            {t('home.tipBody')}
          </Text>
        </Card>
      )}

      <WaterCard onOpenModal={() => router.push('/water')} />

      {dayLocked && (
        <Pressable onPress={() => router.push('/paywall')} style={styles.lockedCard}>
          <LinearGradient
            colors={['rgba(198,241,53,0.16)', 'rgba(240,79,209,0.1)']}
            style={styles.lockedGrad}
          >
            <View style={styles.lockedIcon}>
              <Ionicons name="lock-closed" size={24} color="#C6F135" />
            </View>
            <Text variant="title" color="#FFFFFF" style={{ marginTop: spacing.sm }}>
              {t('challenge.dayOf', { done: doneCount, total: 30 })}
            </Text>
            <Text variant="body" color="#9AA39A" center style={{ marginTop: 6 }}>
              {t('recipe.lockedBody')}
            </Text>
            <View style={styles.lockedBtn}>
              <Text variant="title" color="#0A0F0A">
                {t('onboarding.goPremium')}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      )}

      <Card style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text variant="display" color="#C6F135">
              {doneCount}/30
            </Text>
            <Text variant="caption" color="#9AA39A">
              {t('challenge.completed')}
            </Text>
          </View>
          {startWeight ? (
            <View style={styles.stat}>
              <Text variant="display" color="#C6F135">
                {startWeight} kg
              </Text>
              <Text variant="caption" color="#9AA39A">
                {targetWeight ? `${t('progress.target')} ${targetWeight}` : t('progress.start')}
              </Text>
            </View>
          ) : null}
          <View style={styles.stat}>
            <Text variant="display" color="#9AA39A">
              {tasks.length}
            </Text>
            <Text variant="caption" color="#9AA39A">
              {t('challenge.dailyTasks')}
            </Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
}

function recipeById(id: string) {
  return recipesById[id];
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  greet: { flex: 1 },
  hello: { marginTop: 2 },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#22261F',
    borderWidth: 1,
    borderColor: '#2A2E29',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  planCard: { marginTop: spacing.xl },
  planTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  chipGreen: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(198,241,53,0.14)',
  },
  chipPink: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(240,79,209,0.14)',
    alignSelf: 'flex-start',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2E29',
  },
  planCheck: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#2A2E29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planCheckDone: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  planInfo: { flex: 1, gap: 1 },
  planValue: { marginTop: 1, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  workoutCard: { borderRadius: radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(240,79,209,0.3)' },
  workoutGrad: { padding: spacing.lg },
  workoutTitle: { marginTop: 10, fontWeight: '800' },
  workoutSub: { marginTop: 2 },
  tipCard: {
    backgroundColor: 'rgba(198,241,53,0.10)',
    borderColor: 'rgba(198,241,53,0.25)',
    borderRadius: radius.xl,
  },
  tipTitle: { fontWeight: '700' },
  tipBody: { marginTop: 4 },
  lockedCard: { marginTop: spacing.xl, borderRadius: 22, overflow: 'hidden' },
  lockedGrad: { padding: spacing.lg, alignItems: 'center' },
  lockedIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(198,241,53,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedBtn: {
    alignSelf: 'stretch',
    marginTop: spacing.lg,
    borderRadius: 20,
    backgroundColor: '#C6F135',
    paddingVertical: 14,
    alignItems: 'center',
  },
  statsCard: { marginTop: spacing.lg },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center', gap: 2 },
});