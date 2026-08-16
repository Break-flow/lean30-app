import { premiumRecipes } from './recipes/premium';
import { freeShakes } from './recipes/free-shakes';
import { buildChallenge, weekMilestones } from './challenge';
import { workouts } from './workouts';
import type { AppLanguage } from '@/stores/settings';

export * from './types';
export { weekMilestones } from './challenge';
export { workouts } from './workouts';

const allRecipes = [...freeShakes, ...premiumRecipes];

export const recipesById: Record<string, (typeof allRecipes)[number]> = Object.fromEntries(
  allRecipes.map((r) => [r.id, r])
);

export const challengeDays = buildChallenge();

export const categories: Array<{ id: string }> = [
  { id: 'shakes' },
  { id: 'detox' },
  { id: 'sopas' },
  { id: 'chas' },
  { id: 'doces' },
  { id: 'lowcarb' },
  { id: 'bombas' }
];

export function listRecipes(filter?: { category?: string; query?: string; favorites?: Set<string> }) {
  let out = allRecipes;
  if (filter?.category && filter.category !== 'all') out = out.filter((r) => r.category === filter.category);
  if (filter?.favorites && filter.favorites.size) out = out.filter((r) => filter.favorites!.size ? filter.favorites!.has(r.id) : true);
  if (filter?.query) {
    const q = filter.query.trim().toLowerCase();
    out = out.filter((r) => {
      const tx = getRecipeTx(r, 'en');
      return tx?.title.toLowerCase().includes(q) || String(tx?.summary ?? '').toLowerCase().includes(q);
    });
  }
  return out;
}

const FALLBACK_ORDER: readonly AppLanguage[] = ['en', 'pt'];

/** Pick the best available translation for a recipe. */
export function getRecipeTx(recipe: { tx: Record<string, { title: string; summary: string; steps: string[]; tip?: string }> }, lang: AppLanguage) {
  if (recipe.tx[lang]) return recipe.tx[lang];
  for (const f of FALLBACK_ORDER) {
    if (recipe.tx[f]) return recipe.tx[f];
  }
  return recipe.tx['pt'] ?? recipe.tx['en'];
}

export function getIngredients(recipe: { ingredients?: Record<string, unknown[]> }, lang: AppLanguage) {
  const list = recipe.ingredients;
  if (!list) return [];
  if (list[lang]) return list[lang] as never[];
  for (const f of FALLBACK_ORDER) {
    if (list[f]) return list[f] as never[];
  }
  return (list['base'] ?? []) as never[];
}

export default { recipesById, challengeDays, workouts, categories, listRecipes, getRecipeTx, getIngredients };