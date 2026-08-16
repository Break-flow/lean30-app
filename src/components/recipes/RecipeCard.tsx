import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { getRecipeTx } from '@/content';
import { recipeVisual } from '@/components/recipes/visuals';
import { spacing } from '@/theme';
import type { Recipe } from '@/content';
import type { AppLanguage } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';

interface Props {
  recipe: Recipe;
  lang: AppLanguage;
  onPress: () => void;
}

export function RecipeCard({ recipe, lang, onPress }: Props) {
  const tx = getRecipeTx(recipe, lang);
  const fav = useFavorites((s) => s.has(recipe.id));
  const toggleFav = useFavorites((s) => s.toggle);
  const visual = recipeVisual(recipe);

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <Card padded={false}>
        <View style={[styles.hero, { backgroundColor: visual.color }]}>
          <Ionicons name={visual.icon} size={40} color="#FFFFFF" />
          <View style={styles.favBtn}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={18}
              color={fav ? '#C6F135' : '#FFFFFF'}
              onPress={(e: GestureResponderEvent) => {
                e.stopPropagation();
                toggleFav(recipe.id);
              }}
            />
          </View>
        </View>
        <View style={styles.body}>
          <Text variant="title" numberOfLines={1} style={styles.title}>
            {tx?.title ?? recipe.id}
          </Text>
          <Text variant="caption" color="#9AA39A" numberOfLines={2}>
            {tx?.summary}
          </Text>
          <View style={styles.meta}>
            {recipe.kcal ? (
              <View style={styles.metaItem}>
                <Ionicons name="flame-outline" size={13} color="#9AA39A" />
                <Text variant="caption" color="#9AA39A">
                  {recipe.kcal}
                </Text>
              </View>
            ) : null}
            {recipe.prepMinutes ? (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={13} color="#9AA39A" />
                <Text variant="caption" color="#9AA39A">
                  {recipe.prepMinutes}′
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  hero: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  favBtn: { position: 'absolute', top: 10, right: 10 },
  body: { padding: spacing.md, gap: 6 },
  title: { flex: 1 },
  meta: { flexDirection: 'row', gap: spacing.md, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});