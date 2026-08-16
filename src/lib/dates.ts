export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function posixOf(d: Date): string {
  return todayKey(d);
}

export function nextMonday(from = new Date()): string {
  const dow = from.getDay(); // 0 Sun..6 Sat
  const delta = dow === 0 ? 1 : dow === 1 ? 7 : 8 - dow;
  return todayKey(addDays(from, delta));
}

export function tomorrowKey(d = new Date()): string {
  return todayKey(addDays(d, 1));
}

/** Day number inside the challenge (1-based) for a given date, or null. */
export function challengeDayNumber(startDate: string | null, date = new Date()): number | null {
  if (!startDate) return null;
  const start = new Date(`${startDate}T00:00:00`);
  const diff = Math.floor((date.getTime() - start.getTime()) / 86400000);
  if (diff < 0) return null;
  return Math.min(diff + 1, 30);
}

export function dateOfChallengeDay(startDate: string, day: number): string {
  const start = new Date(`${startDate}T00:00:00`);
  const d = addDays(start, day - 1);
  return todayKey(d);
}

/**
 * Current consecutive-day streak: how many days in a row (ending today, or
 * yesterday if today is not yet complete) have a completedAt set.
 */
export function currentStreak(
  progress: Record<number, { completedAt?: string }>,
  startDate: string | null,
  date = new Date(),
): number {
  if (!startDate) return 0;
  const done = new Set<number>();
  for (const [k, p] of Object.entries(progress)) {
    if (p.completedAt) done.add(Number(k));
  }
  let cursor = date;
  let dayNum = challengeDayNumber(startDate, cursor);
  if (dayNum === null || !done.has(dayNum)) {
    cursor = addDays(cursor, -1);
    dayNum = challengeDayNumber(startDate, cursor);
  }
  let streak = 0;
  while (dayNum !== null && done.has(dayNum)) {
    streak += 1;
    cursor = addDays(cursor, -1);
    dayNum = challengeDayNumber(startDate, cursor);
  }
  return streak;
}