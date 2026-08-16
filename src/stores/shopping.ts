import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Shopping list state.
 *
 * - Weekly ("generated") items are derived live from the current week's meals
 *   (see src/lib/shopping.ts) and reconciled here through a `hidden` set so the
 *   user can dismiss them per week without changing the plan data.
 * - Custom items are typed by the user and stored directly.
 * - `checked` is a flat map keyed by stable item keys.
 */

export interface ShoppingState {
  custom: string[];
  /** stable keys of generated items the user cleared (per week) */
  hidden: string[];
  checked: Record<string, boolean>;
  addCustom: (text: string) => void;
  removeCustom: (text: string) => void;
  toggle: (key: string) => void;
  clearChecked: (generatedKeys: string[]) => void;
  reset: () => void;
}

export const useShopping = create<ShoppingState>()(
  persist(
    (set, get) => ({
      custom: [],
      hidden: [],
      checked: {},
      addCustom: (text) => {
        const clean = text.trim();
        if (!clean) return;
        const key = `c:${clean.toLowerCase()}`;
        const exists = get().custom.some((c) => `c:${c.toLowerCase()}` === key);
        if (exists) return;
        set({ custom: [...get().custom, clean] });
      },
      removeCustom: (text) => {
        const key = `c:${text.toLowerCase()}`;
        const next = get().custom.filter((c) => `c:${c.toLowerCase()}` !== key);
        const checked = { ...get().checked };
        delete checked[key];
        set({ custom: next, checked });
      },
      toggle: (key) => {
        set({ checked: { ...get().checked, [key]: !get().checked[key] } });
      },
      clearChecked: (generatedKeys) => {
        const done = Object.keys(get().checked).filter((k) => get().checked[k]);
        const custom = get().custom.filter((c) => !done.includes(`c:${c.toLowerCase()}`));
        const hidden = [...get().hidden];
        for (const k of done) {
          if (generatedKeys.includes(k) && !hidden.includes(k)) hidden.push(k);
        }
        const checked = {};
        set({ custom, hidden, checked });
      },
      reset: () => set({ custom: [], hidden: [], checked: {} }),
    }),
    {
      name: 'lean30:shopping',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function customKey(text: string): string {
  return `c:${text.trim().toLowerCase()}`;
}

export function generatedKey(week: number, text: string): string {
  return `w:${week}:${text.trim().toLowerCase()}`;
}