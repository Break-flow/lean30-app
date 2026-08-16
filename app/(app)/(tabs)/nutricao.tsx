import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useProfile } from '@/stores/profile';
import { useChallenge } from '@/stores/challenge';
import { useFavorites } from '@/stores/favorites';
import { usePurchases } from '@/stores/purchases';
import { challengeDays, weekMilestones, listRecipes, categories } from '@/content';
import { challengeDayNumber } from '@/lib/dates';
import { categoryIcon } from '@/components/recipes/visuals';
import { radius, spacing } from '@/theme';
import type { AppLanguage } from '@/stores/settings';

export default function Nutricao() {
  const router = useRouter();
  const params = useLocalSearchParams<{ cat?: string }>();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language) as AppLanguage;
  const planStartDate = useProfile((s) => s.planStartDate);
  const progress = useChallenge((s) => s.progress);
  const doneCount = useChallenge((s) => s.doneCount);
  const favoriteIds = useFavorites((s) => s.ids);
  const isPremium = usePurchases((s) => s.isPremium);

  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [lockDay, setLockDay] = useState<number | null>(null);

  useEffect(() => {
    if (params.cat && params.cat !== category) setCategory(params.cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.cat]);

  const currentDay = useMemo(() => challengeDayNumber(planStartDate), [planStartDate]);
  const today = useMemo(() => (currentDay ? challengeDays[currentDay - 1] : undefined), [currentDay]);

  const weeks = useMemo(() => {
    const groups: Array<{ week: number; days: typeof challengeDays }> = [];
    for (let w = 1; w <= 4; w++) {
      groups.push({ week: w, days: challengeDays.filter((d) => d.week === w) });
    }
    return groups;
  }, []);

  const rows = useMemo(() => {
    let out = listRecipes({ category, query });
    if (onlyFavs) {
      out = out.filter((r) => favoriteIds[r.id]);
    }
    return out;
  }, [category, query, onlyFavs, favoriteIds]);

  const cats = useMemo(() => [{ id: 'all' }, ...categories], []);

  const openDay = (day: number) => {
    const isDone = Boolean(progress[day]?.completedAt);
    if (isPremium || day === 1 || isDone) {
      router.push(`/day/${day}`);
    } else {
      setLockDay(day);
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="heading">{t('tabs.nutricao')}</Text>
        <Text variant="caption" color="#9AA39A">
          {t('challenge.subtitleFree')}
        </Text>
      </View>

      <Card elevated style={styles.overview}>
        <View style={styles.overviewRow}>
          <View style={styles.overviewStat}>
            <Text variant="display" color="#C6F135">
              {doneCount}/30
            </Text>
            <Text variant="caption" color="#9AA39A">
              {t('challenge.completed')}
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text variant="display" color="#C6F135">
              {currentDay ?? '--'}
            </Text>
            <Text variant="caption" color="#9AA39A">
              {t('common.day')}
            </Text>
          </View>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${(doneCount / 30) * 100}%` }]} />
        </View>
      </Card>

      {weeks.map(({ week, days }) => {
        const milestone = weekMilestones[week]?.[lang];
        return (
          <View key={week} style={styles.weekSection}>
            <View style={styles.weekHeader}>
              <Text variant="eyebrow" color="#C6F135" uppercase>
                {t('challenge.week', { n: week })}
              </Text>
              <View style={styles.weekRules}>
                {milestone ? (
                  <Text variant="caption" color="#9AA39A" style={styles.weekMill}>
                    {milestone}
                  </Text>
                ) : null}
                <Text variant="caption" color="#C6F135">
                  ✓ {days.filter((d) => Boolean(progress[d.day]?.completedAt)).length}/7
                </Text>
              </View>
            </View>

            <View style={styles.daysGrid}>
              {days.map((d) => {
                const done = Boolean(progress[d.day]?.completedAt);
                const isToday = currentDay === d.day;
                const locked = !isPremium && d.day > 1 && !done;
                return (
                  <Pressable
                    key={d.day}
                    onPress={() => openDay(d.day)}
                    style={[styles.dayCell, done && styles.dayDone, isToday && styles.dayToday]}
                  >
                    <Text
                      variant="title"
                      color={done ? '#0A0F0A' : isToday ? '#C6F135' : locked ? '#6E766E' : '#FFFFFF'}
                      style={styles.dayNum}
                    >
                      {d.day}
                    </Text>
                    {done && <Ionicons name="checkmark-circle" size={16} color="#0A0F0A" />}
                    {locked && <Ionicons name="lock-closed" size={12} color="#6E766E" />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      {today && (
        <Card style={styles.card}>
          <Text variant="eyebrow" color="#C6F135" uppercase>
            {t('home.todaysPlan')}
          </Text>
          {today.meals.map((slot) => {
            const opt = slot.options[0];
            return (
              <Pressable
                key={slot.period}
                style={styles.mealRow}
                onPress={() => {
                  if (opt.recipeId) router.push(`/recipe/${opt.recipeId}`);
                  else if (opt.category) router.navigate({ pathname: '/(app)/(tabs)/nutricao', params: { cat: opt.category } });
                }}
              >
                <Text variant="caption" color="#9AA39A" uppercase style={styles.mealPeriod}>
                  {t(`challenge.${slot.period}`)}
                </Text>
                <Text variant="body" color="#FFFFFF" style={styles.mealInfo}>
                  {opt.label[lang]}
                </Text>
              </Pressable>
            );
          })}
        </Card>
      )}

      <View style={styles.libraryHeader}>
        <Text variant="heading">{t('recipes.title')}</Text>
        <Text variant="caption" color="#9AA39A">
          {t('recipes.count', { count: rows.length })}
        </Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.search}>
          <Ionicons name="search" size={16} color="#9AA39A" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder={t('recipes.searchPlaceholder')}
            placeholderTextColor="#6E766E"
          />
        </View>
        <Pressable style={[styles.favToggle, onlyFavs && styles.favToggleOn]} onPress={() => setOnlyFavs((v) => !v)}>
          <Ionicons name={onlyFavs ? 'heart' : 'heart-outline'} size={18} color={onlyFavs ? '#C6F135' : '#9AA39A'} />
        </Pressable>
      </View>

      <View style={styles.chips}>
        {cats.map((c) => {
          const active = category === c.id;
          return (
            <Pressable key={c.id} onPress={() => setCategory(c.id)} style={[styles.chip, active && styles.chipActive]}>
              <Ionicons name={categoryIcon(c.id)} size={14} color={active ? '#0A0F0A' : '#9AA39A'} />
              <Text variant="body" style={active ? styles.chipTextActive : styles.chipTextBase}>
                {c.id === 'all' ? t('recipes.all') : t(`recipes.category.${c.id}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {rows.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="body" color="#9AA39A" center>
            {t('recipes.empty')}
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {rows.map((item) => (
            <View key={item.id} style={styles.gridCol}>
              <RecipeCard recipe={item} lang={lang} onPress={() => router.push(`/recipe/${item.id}`)} />
            </View>
          ))}
        </View>
      )}

      <LockedOverlay
        visible={lockDay != null}
        onClose={() => setLockDay(null)}
        onUnlock={() => {
          setLockDay(null);
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
  overview: { marginTop: spacing.xl },
  overviewRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.lg },
  overviewStat: { alignItems: 'center', gap: 2 },
  bar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 4, backgroundColor: '#C6F135' },
  weekSection: { marginTop: spacing.xl },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  weekRules: { alignItems: 'flex-end', gap: 2 },
  weekMill: { maxWidth: 190 },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  dayCell: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDone: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  dayToday: { borderColor: '#C6F135', borderWidth: 1.5 },
  dayNum: { fontSize: 18 },
  card: { marginTop: spacing.lg, gap: spacing.sm },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: spacing.md,
  },
  mealPeriod: { width: 76 },
  mealInfo: { flex: 1 },
  libraryHeader: { paddingTop: spacing.xl, gap: 2 },
  searchRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
  },
  favToggle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  favToggleOn: { borderColor: 'rgba(198,241,53,0.5)', backgroundColor: 'rgba(198,241,53,0.08)' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  chipTextActive: { color: '#0A0F0A', fontSize: 13 },
  chipTextBase: { fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: spacing.md },
  gridCol: { width: '48.5%' },
  empty: { paddingVertical: 60, alignItems: 'center' },
});