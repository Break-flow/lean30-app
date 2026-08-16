import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { WATER_GLASS_ML } from '@/lib/constants';
import { todayKey } from '@/lib/dates';

interface WaterState {
  logs: Record<string, number>;
  current: number;
  addGlass: () => void;
  removeGlass: () => void;
  resetToday: () => void;
  setAmount: (ml: number) => void;
  dailyGoal: (weightKg: number) => number;
  hydrate: () => void;
}

export const useWater = create<WaterState>()(
  persist(
    (set, get) => ({
      logs: {},
      current: 0,
      addGlass: () => {
        const t = todayKey();
        const next = (get().logs[t] ?? 0) + WATER_GLASS_ML;
        set({ logs: { ...get().logs, [t]: next }, current: next });
      },
      removeGlass: () => {
        const t = todayKey();
        const prev = get().logs[t] ?? 0;
        const next = Math.max(0, prev - WATER_GLASS_ML);
        set({ logs: { ...get().logs, [t]: next }, current: next });
      },
      resetToday: () => {
        const t = todayKey();
        set({ logs: { ...get().logs, [t]: 0 }, current: 0 });
      },
      setAmount: (ml) => {
        const t = todayKey();
        set({ logs: { ...get().logs, [t]: ml }, current: ml });
      },
      dailyGoal: (weightKg) => {
        return Math.round(30 * weightKg);
      },
      hydrate: () => {
        set({ current: get().logs[todayKey()] ?? 0 });
      },
    }),
    {
      name: 'lean30:water',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useWater.setState({ current: useWater.getState().logs[todayKey()] ?? 0 });
      },
    },
  ),
);