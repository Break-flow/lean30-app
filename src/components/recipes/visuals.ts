import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type IoniconName = ComponentProps<typeof Ionicons>['name'];

export interface CategoryVisual {
  icon: IoniconName;
  color: string;
}

const VISUALS: Record<string, CategoryVisual> = {
  shakes: { icon: 'nutrition', color: '#5BA829' },
  detox: { icon: 'leaf', color: '#C6F135' },
  sopas: { icon: 'restaurant', color: '#C6F135' },
  chas: { icon: 'cafe', color: '#9AA39A' },
  doces: { icon: 'ice-cream', color: '#F04FD1' },
  lowcarb: { icon: 'barbell', color: '#F04FD1' },
  bombas: { icon: 'water', color: '#5BA829' },
};

const DEFAULT_VISUAL: CategoryVisual = { icon: 'fast-food', color: '#C6F135' };

export function recipeVisual(recipe: { category?: string }): CategoryVisual {
  return (recipe.category && VISUALS[recipe.category]) || DEFAULT_VISUAL;
}

export function categoryIcon(id: string): IoniconName {
  return VISUALS[id]?.icon ?? DEFAULT_VISUAL.icon;
}