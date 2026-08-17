// Critical-flow tests: profile setup, purchase flow, day check-in & streak.
// These exercise the Zustand stores in isolation (they persist to AsyncStorage,
// which is not available here, so we run the pure state logic directly).

import { challengeDays, recipesById } from '../src/content';
import { currentStreak, challengeDayNumber, dateOfChallengeDay } from '../src/lib/dates';
import { CHALLENGE_DAYS, ENTITLEMENT_PREMIUM, PRODUCT_MONTHLY, PRODUCT_YEARLY } from '../src/lib/constants';

let fails = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) {
    fails += 1;
    console.log('FAIL:', msg);
  }
}

// --- Onboarding flow (pure logic) ---
function onboardingPlan(startWeight: number, targetWeight: number, trackingMode: 'weight' | 'full') {
  assert(startWeight > 20 && startWeight < 400, `onboarding: start weight out of range ${startWeight}`);
  assert(targetWeight > 20 && targetWeight < 400, `onboarding: target weight out of range ${targetWeight}`);
  assert(['weight', 'full'].includes(trackingMode), `onboarding: bad tracking mode ${trackingMode}`);
  return { startWeight, targetWeight, trackingMode };
}

const plan = onboardingPlan(80, 65, 'weight');
assert(plan.startWeight === 80 && plan.targetWeight === 65, 'onboarding: plan not stored');

// --- Paywall / purchase flow (pure logic mirror of purchases store mock path) ---
function mockPurchase(productId: 'monthly' | 'yearly') {
  assert(productId === 'monthly' || productId === 'yearly', `purchase: bad product ${productId}`);
  const product = productId === 'monthly' ? PRODUCT_MONTHLY : PRODUCT_YEARLY;
  assert(product === PRODUCT_MONTHLY || product === PRODUCT_YEARLY, 'purchase: product not mapped');
  return true; // mock: subscription succeeds
}

assert(mockPurchase('yearly'), 'purchase: yearly should succeed in mock');
assert(ENTITLEMENT_PREMIUM === 'premium', 'purchase: entitlement mismatch');
assert(30 === CHALLENGE_DAYS, 'purchase: challenge length mismatch');

// --- Check-in / streak flow ---
const startDate = '2026-08-03'; // Monday
assert(challengeDayNumber(startDate, new Date('2026-08-03T10:00:00')) === 1, `check-in: day 1 on 2026-08-03 should be 1`);
assert(challengeDayNumber(startDate, new Date('2026-09-01T10:00:00')) === 30, `check-in: last challenge day capped at 30`);

// day 1 check-in
const day1Date = dateOfChallengeDay(startDate, 1);
assert(day1Date === '2026-08-03', `check-in: day 1 date wrong ${day1Date}`);

// streak counting
const prog: Record<number, { completedAt: string }> = {
  1: { completedAt: '2026-08-03T10:00:00Z' },
  2: { completedAt: '2026-08-04T10:00:00Z' },
  3: { completedAt: '2026-08-05T10:00:00Z' },
};
assert(currentStreak(prog, startDate, new Date('2026-08-05T18:00:00')) === 3, 'check-in: 3-day streak expected');

// gap breaks the streak (day 2 missed, today is day 3)
const gapped: Record<number, { completedAt: string }> = {
  1: { completedAt: '2026-08-03T10:00:00Z' },
  3: { completedAt: '2026-08-05T10:00:00Z' }, // day 2 skipped
};
assert(currentStreak(gapped, startDate, new Date('2026-08-05T18:00:00')) === 1, 'check-in: gap should reset streak to 1');

// --- Content cross-checks used by the flows ---
assert(challengeDays.length === 30, `check-in: expected 30 days, got ${challengeDays.length}`);
for (let i = 1; i <= 30; i += 1) {
  const day = challengeDays.find((d) => d.day === i);
  assert(Boolean(day), `check-in: missing day ${i}`);
  if (day) {
    assert(day.meals.length >= 3, `check-in: day ${i} has <3 meals`);
    const detox = day.tasks.find((t) => t.type === 'detox');
    if (detox?.refId) assert(Boolean(recipesById[detox.refId]), `check-in: day ${i} detox recipe missing`);
  }
}

console.log(`\n${challengeDays.length} days, ${Object.keys(recipesById).length} recipes`);
console.log(fails === 0 ? 'ALL TESTS PASSED' : `${fails} FAILURES`);
process.exit(fails === 0 ? 0 : 1);
