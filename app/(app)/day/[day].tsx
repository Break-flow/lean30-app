import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useChallenge } from '@/stores/challenge';
import { usePurchases } from '@/stores/purchases';
import { challengeDays, weekMilestones, recipesById, getRecipeTx } from '@/content';
import type { SlotOption } from '@/content';
import { spacing } from '@/theme';
import { useState } from 'react';
import type { AppLanguage } from '@/stores/settings';

export default function DayDetail() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const router = useRouter();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language) as AppLanguage;
  const progress = useChallenge((s) => s.progress);
  const toggleDay = useChallenge((s) => s.toggle);
  const isPremium = usePurchases((s) => s.isPremium);
  const [showLock, setShowLock] = useState(false);

  const dayNum = Number(day);
  const todayIndex = dayNum - 1;
  const dayData = challengeDays[todayIndex];
  if (!dayData) return null;
  const done = Boolean(progress[dayNum]?.completedAt);
  const milestone = weekMilestones[dayData.week]?.[lang];
  const locked = !isPremium && dayNum > 1 && !done;

  if (locked) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
        <View style={styles.top}>
          <Pressable onPress={() => router.back()} style={styles.roundBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <Text variant="heading">
            {t('common.day')} {dayNum}
          </Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.lockedWrap}>
          <View style={styles.lockIcon}>
            <Ionicons name="lock-closed" size={30} color="#C6F135" />
          </View>
          <Text variant="heading" center>
            {t('common.locked')}
          </Text>
          <Text variant="body" color="#9AA39A" center style={styles.lockBody}>
            {t('recipe.lockedBody')}
          </Text>
          <LockedOverlay
            visible={showLock}
            onUnlock={() => {
              setShowLock(false);
              router.replace('/paywall');
            }}
            title={t('common.locked')}
            body={t('recipe.lockedBody')}
          />
          <Pressable onPress={() => setShowLock(true)} style={styles.lockCta}>
            <Text variant="title" color="#0A0F0A">
              {t('onboarding.goPremium')}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const openOption = (opt: SlotOption) => {
    if (opt.recipeId) {
      router.navigate(`/recipe/${opt.recipeId}`);
    } else if (opt.category) {
      router.navigate({ pathname: '/(app)/(tabs)/nutricao', params: { cat: opt.category } });
    } else {
      router.navigate({ pathname: '/(app)/(tabs)/nutricao', params: {} });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>
        <Text variant="heading">
          {t('common.day')} {dayNum} · {t('challenge.week', { n: dayData.week })}
        </Text>
        <Pressable onPress={() => toggleDay(dayNum)} style={[styles.roundBtn, done && styles.doneBtn]}>
          <Ionicons name="checkmark" size={20} color={done ? '#0A0F0A' : '#9AA39A'} />
        </Pressable>
      </View>

      {milestone ? (
        <Text variant="caption" color="#9AA39A" style={styles.milestone}>
          {milestone}
        </Text>
      ) : null}

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#C6F135" uppercase>
          {t('challenge.dailyTasks')}
        </Text>
        {dayData.tasks.map((task, i) => {
          const taskDone = Boolean(progress[dayNum]?.taskDone?.includes(String(i)));
          return (
            <Pressable
              key={i}
              style={styles.taskRow}
              onPress={() => toggleDay(dayNum, i)}
            >
              <View style={[styles.check, taskDone && styles.checkDone]}>
                <Ionicons name="checkmark" size={13} color={taskDone ? '#0A0F0A' : 'transparent'} />
              </View>
              <Text variant="body" color={taskDone ? '#6E766E' : '#FFFFFF'} style={{ flex: 1 }}>
                {task.label[lang]}
              </Text>
            </Pressable>
          );
        })}
      </Card>

      {dayData.meals.map((slot) => (
        <Card key={slot.period} style={styles.card}>
          <Text variant="eyebrow" color="#C6F135" uppercase>
            {t(`challenge.${slot.period}`)}
          </Text>
          <View style={styles.items}>
            {slot.options.map((opt, i) => {
              const recipe = opt.recipeId ? recipesById[opt.recipeId] : undefined;
              const title = recipe
                ? getRecipeTx(recipe, lang)?.title ?? opt.label[lang]
                : opt.label[lang];
              const hasTarget = Boolean(opt.recipeId || opt.category);
              return (
                <Pressable key={i} style={styles.itemRow} onPress={() => openOption(opt)}>
                  <View style={styles.itemMain}>
                    <View style={styles.itemTitleRow}>
                      <Text variant="body" color="#FFFFFF" style={styles.itemText}>
                        {title}
                      </Text>
                    </View>
                    {opt.note ? (
                      <Text variant="caption" color="#9AA39A">
                        {opt.note[lang]}
                      </Text>
                    ) : null}
                  </View>
                  {hasTarget ? (
                    <Ionicons name="chevron-forward" size={16} color="#C6F135" />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Card>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0F0D' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtn: { backgroundColor: '#C6F135' },
  milestone: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  lockedWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  lockIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(198,241,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  lockBody: { lineHeight: 21 },
  lockCta: {
    marginTop: spacing.xl,
    alignSelf: 'stretch',
    borderRadius: 20,
    backgroundColor: '#C6F135',
    paddingVertical: 16,
    alignItems: 'center',
  },
  card: { margin: spacing.lg, marginBottom: spacing.sm, gap: spacing.sm },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  items: { gap: spacing.sm, marginTop: spacing.sm },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  itemMain: { flex: 1 },
  itemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemText: { lineHeight: 22, flex: 1 },
});