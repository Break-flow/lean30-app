import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';
import { recipesById, getRecipeTx, getIngredients } from '@/content';
import { recipeVisual } from '@/components/recipes/visuals';
import type { Ingredient } from '@/content';
import { spacing } from '@/theme';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language);
  const fav = useFavorites((s) => s.has(id!));
  const toggleFav = useFavorites((s) => s.toggle);

  const recipe = recipesById[id!];
  if (!recipe) {
    return null;
  }
  const tx = getRecipeTx(recipe, lang);
  const ingredients = getIngredients(recipe, lang) as Ingredient[];
  const visual = recipeVisual(recipe);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>
        <View style={styles.roundBtn}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={20}
            color={fav ? '#C6F135' : '#FFFFFF'}
            onPress={() => toggleFav(id!)}
          />
        </View>
      </View>

      <View style={styles.hero}>
        <View style={[styles.emoji, { backgroundColor: visual.color }]}>
          <Ionicons name={visual.icon} size={34} color="#FFFFFF" />
        </View>
        <Text variant="display" center>
          {tx?.title ?? id}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.metaRow}>
          {recipe.kcal ? (
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={16} color="#9AA39A" />
              <Text variant="caption" color="#FFFFFF">
                {t('recipe.calories')}: {recipe.kcal}
              </Text>
            </View>
          ) : null}
          {recipe.prepMinutes ? (
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#9AA39A" />
              <Text variant="caption" color="#FFFFFF">
                {t('recipe.prepTime')}: {recipe.prepMinutes}′
              </Text>
            </View>
          ) : null}
          {recipe.servings ? (
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={16} color="#9AA39A" />
              <Text variant="caption" color="#FFFFFF">
                {t('recipe.servings')}: {recipe.servings}
              </Text>
            </View>
          ) : null}
        </View>

        {tx?.summary && (
          <Text variant="body" color="#9AA39A" style={{ marginBottom: spacing.lg }}>
            {tx.summary}
          </Text>
        )}

        <Text variant="title" style={styles.section}>
          {t('recipe.ingredients')}
        </Text>
        <View style={styles.list}>
          {ingredients.map((it, i) => (
            <View key={i} style={styles.row}>
              <View style={styles.dot} />
              <Text variant="body" color="#FFFFFF" style={styles.rowText}>
                {it.qty ? `${it.qty} · ` : ''}
                {it.item}
                {it.optional ? ` (${t('recipe.optional')})` : ''}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="title" style={styles.section}>
          {t('recipe.steps')}
        </Text>
        {tx?.steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text variant="caption" color="#0A0F0A">
                {i + 1}
              </Text>
            </View>
            <Text variant="body" color="#9AA39A" style={styles.stepText}>
              {s}
            </Text>
          </View>
        ))}

        {tx?.tip && (
          <View style={styles.tip}>
            <Ionicons name="bulb-outline" size={16} color="#C6F135" />
            <Text variant="caption" color="#C6F135" style={styles.tipText}>
              {tx.tip}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0F0D' },
  top: {
    flexDirection: 'row',
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
  hero: { alignItems: 'center', gap: spacing.md, paddingTop: spacing.xl, paddingHorizontal: spacing.xl },
  emoji: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: spacing.xl, paddingTop: spacing.lg },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  section: { marginBottom: spacing.md, marginTop: spacing.xl },
  list: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C6F135',
    marginTop: 7,
  },
  rowText: { flex: 1 },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#C6F135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { flex: 1, lineHeight: 21 },
  tip: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: 'rgba(198,241,53,0.07)',
  },
  tipText: { flex: 1 },
});