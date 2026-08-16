import { challengeDays, getIngredients, recipesById } from '@/content';
import type { Ingredient } from '@/content';
import type { AppLanguage } from '@/stores/settings';

/** 1-based week number for a given challenge day. */
export function weekOfDay(currentDay: number): number {
  return Math.floor((currentDay - 1) / 7) + 1;
}

/** 1-based challenge day numbers that belong to the same week as `currentDay`. */
export function dayNumbersInWeek(currentDay: number): number[] {
  const week = weekOfDay(currentDay);
  const start = (week - 1) * 7 + 1;
  return Array.from({ length: 7 }, (_, i) => start + i).filter((d) => d <= 30);
}

/**
 * Aggregates a human-readable shopping list for the current plan week:
 * the main menu option of every meal slot, plus ingredients when a slot points
 * to an explicit recipe. Duplicates are collapsed, order is stable.
 */
export function weeklyShoppingItems(currentDay: number, lang: AppLanguage): string[] {
  const items: string[] = [];
  const seen = new Set<string>();

  const add = (raw: string) => {
    const text = raw.trim().replace(/^[\s•]/, '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    const key = text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    items.push(text);
  };

  for (const day of dayNumbersInWeek(currentDay)) {
    const cd = challengeDays[day - 1];
    if (!cd) continue;
    for (const slot of cd.meals) {
      const opt = slot.options[0];
      if (!opt) continue;
      if (opt.recipeId) {
        const recipe = recipesById[opt.recipeId];
        if (recipe) {
          for (const ing of getIngredients(recipe, lang) as Ingredient[]) {
            add(ing.qty ? `${ing.qty} · ${ing.item}` : ing.item);
          }
        }
      } else {
        const label = opt.label[lang] ?? opt.label.pt ?? opt.label.en;
        for (const line of String(label).split('\n')) add(line);
      }
    }
  }

  return items;
}