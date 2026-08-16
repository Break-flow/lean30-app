import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  ids: Record<string, boolean>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  list: () => string[];
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: {},
      toggle: (id) => {
        const next = { ...get().ids, [id]: !get().ids[id] };
        set({ ids: next });
      },
      has: (id) => Boolean(get().ids[id]),
      list: () => Object.keys(get().ids).filter((k) => get().ids[k]),
    }),
    { name: 'lean30:favorites', storage: createJSONStorage(() => AsyncStorage) },
  ),
);