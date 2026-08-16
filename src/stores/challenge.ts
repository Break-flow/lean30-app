import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CHALLENGE_DAYS } from '@/lib/constants';
import { challengeDayNumber, dateOfChallengeDay } from '@/lib/dates';

export interface DayProgress {
  completedAt: string; // ISO date
  taskDone: string[]; // task indexes
}

interface ChallengeState {
  /** key: challenge day number (1..30) */
  progress: Record<number, DayProgress>;
  activePlanId: string | null;
  toggle: (day: number, taskIndex?: number) => void;
  isDayDone: (day: number) => boolean;
  doneCount: number;
  currentDayIndex: (startDate: string | null) => number | null;
  reset: () => void;
}

function todayOf() {
  return new Date().toISOString();
}

export const useChallenge = create<ChallengeState>()(
  persist(
    (set, get) => ({
      progress: {},
      activePlanId: null,
      doneCount: 0,
      toggle: (day, taskIndex) => {
        const prev = get().progress[day];
        if (taskIndex === undefined) {
          // toggle whole-day completion
          const next = { ...get().progress };
          if (prev && prev.completedAt) {
            delete next[day];
          } else {
            next[day] = { completedAt: todayOf(), taskDone: [] };
          }
          set({ progress: next, doneCount: Object.values(next).filter((p) => p.completedAt).length });
          return;
        }
        // toggle a single task
        const tasks = prev?.taskDone ?? [];
        const idx = tasks.indexOf(String(taskIndex));
        const nextTasks = idx >= 0 ? tasks.filter((t) => t !== String(taskIndex)) : [...tasks, String(taskIndex)];
        const done = nextTasks.length >= 5;
        const next = { ...get().progress };
        if (done) {
          next[day] = { completedAt: todayOf(), taskDone: nextTasks };
        } else if (idx >= 0 && prev) {
          next[day] = { completedAt: prev.completedAt, taskDone: nextTasks };
        } else {
          next[day] = { completedAt: prev?.completedAt ?? '', taskDone: nextTasks };
        }
        set({ progress: next, doneCount: Object.values(next).filter((p) => p.completedAt).length });
      },
      isDayDone: (day) => Boolean(get().progress[day]?.completedAt),
      currentDayIndex: (startDate) => challengeDayNumber(startDate),
      reset: () => set({ progress: {}, activePlanId: null, doneCount: 0 }),
    }),
    {
      name: 'lean30:challenge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const TOTAL_DAYS = CHALLENGE_DAYS;

export function dayDate(startDate: string, day: number): string {
  return dateOfChallengeDay(startDate, day);
}