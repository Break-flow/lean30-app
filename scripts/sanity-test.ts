import { challengeDays, recipesById, getIngredients, workouts } from '../src/content';
import { weeklyShoppingItems, weekOfDay } from '../src/lib/shopping';
import { currentStreak } from '../src/lib/dates';
import type { Ingredient } from '../src/content';
import type { AppLanguage } from '../src/stores/settings';

let fails = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) {
    fails += 1;
    console.log('FAIL:', msg);
  }
}

// 1. every day's detox refId resolves to a real recipe (workouts are separate content)
for (const d of challengeDays) {
  const detoxTask = d.tasks.find((t) => t.type === 'detox');
  if (detoxTask?.refId) {
    assert(Boolean(recipesById[detoxTask.refId]), `day ${d.day}: detox recipe missing ${detoxTask.refId}`);
  }
  const workoutTask = d.tasks.find((t) => t.type === 'workout');
  if (workoutTask?.refId) {
    assert(
      workouts.some((w) => w.id === workoutTask.refId),
      `day ${d.day}: workout missing ${workoutTask.refId}`,
    );
  }
}

// 2. every recipe has en+pt tx and ingredients (es/fr intentionally fall back to en)
for (const r of Object.values(recipesById)) {
  assert(Boolean(r.tx.en), `${r.id}: missing en tx`);
  assert(Boolean(r.tx.pt), `${r.id}: missing pt tx`);
  const hasFallback = Boolean(r.tx.es) || Boolean(r.tx.en);
  assert(hasFallback, `${r.id}: no es fallback`);
  const ing = r.ingredients.base ?? [];
  assert(ing.length > 0, `${r.id}: no ingredients`);
}

// 3. weekly shopping list is non-empty and stable, keys unique
for (const day of [1, 8, 15, 22, 30]) {
  for (const lang of ['en', 'pt'] as AppLanguage[]) {
    const items = weeklyShoppingItems(day, lang as AppLanguage);
    assert(items.length > 0, `day ${day} ${lang}: empty weekly list`);
    const uniq = new Set(items.map((s) => s.toLowerCase())).size;
    assert(uniq === items.length, `day ${day} ${lang}: duplicate items`);
  }
}

// 4. ingredients aggregation pulls real data
const weekItems = weeklyShoppingItems(8, 'en');
const allIng = (Object.values(recipesById).find((r) => r.id === 'detox-lime-cucumber')!);
const ings = getIngredients(allIng, 'en') as Ingredient[];
assert(ings.length > 0, 'getIngredients empty');

// 5. streak: 0 when no progress, counts consecutive
const startDate = '2026-08-03'; // a Monday
const emptyProg: Record<number, { completedAt?: string }> = {};
assert(currentStreak(emptyProg, startDate) === 0, 'streak should be 0 with nothing done');

const prog1 = { 1: { completedAt: 'x' }, 2: { completedAt: 'x' } };
assert(currentStreak(prog1, startDate, new Date('2026-08-05T12:00:00')) === 2, 'streak today-not-done should count back from yesterday');

// 6. weekOfDay correctness
assert(weekOfDay(1) === 1 && weekOfDay(7) === 1, 'week1');
assert(weekOfDay(8) === 2 && weekOfDay(14) === 2, 'week2');
assert(weekOfDay(22) === 4 && weekOfDay(30) === 5, 'week4/5 (30th is week 5 by arith)');

// 7. all four workout circuits A–D present with 5+ exercises each
const expectedCircuits = ['workout-a', 'workout-b', 'workout-c', 'workout-d'];
for (const id of expectedCircuits) {
  const w = workouts.find((x) => x.id === id);
  assert(Boolean(w), `circuit ${id} missing`);
  assert(Boolean(w && w.exercises.length >= 5), `circuit ${id} has <5 exercises`);
}
assert(workouts.length >= 4, `expected >=4 circuits, got ${workouts.length}`);

// 8. every workout task in the challenge resolves to a real circuit
for (const d of challengeDays) {
  const workoutTask = d.tasks.find((t) => t.type === 'workout');
  if (workoutTask?.refId) {
    assert(
      workouts.some((w) => w.id === workoutTask.refId),
      `day ${d.day}: workout ref missing ${workoutTask.refId}`,
    );
  }
}

// 9. premium recipe categories all represented (soups, low carb, boosters, teas)
const ids = Object.keys(recipesById);
const hasSoups = ids.some((id) => id.startsWith('soup-'));
const hasLowCarb = ids.some((id) => id.startsWith('lowcarb-'));
const hasBoosters = ids.some((id) => id.startsWith('booster-'));
const hasTeas = ids.some((id) => id.startsWith('tea-'));
const hasDetox = ids.some((id) => id.startsWith('detox-'));
const hasSweets = ids.some((id) => id.startsWith('sweet-'));
assert(hasSoups, 'content: soups missing');
assert(hasLowCarb, 'content: low carb missing');
assert(hasBoosters, 'content: boosters missing');
assert(hasTeas, 'content: teas missing');
assert(hasDetox, 'content: detox missing');
assert(hasSweets, 'content: sweets missing');

console.log(`\n${dayCount()} days, ${Object.keys(recipesById).length} recipes`);
console.log(fails === 0 ? 'ALL TESTS PASSED' : `${fails} FAILURES`);

function dayCount() {
  return challengeDays.length;
}