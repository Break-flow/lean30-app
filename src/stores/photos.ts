import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ProgressPhoto {
  id: string;
  /** dateKey yyyy-mm-dd */
  date: string;
  /** local URI (file://) stored on device */
  uri: string;
}

interface PhotosState {
  photos: ProgressPhoto[];
  add: (photo: Omit<ProgressPhoto, 'id'>) => void;
  remove: (id: string) => void;
  reset: () => void;
}

export const usePhotos = create<PhotosState>()(
  persist(
    (set) => ({
      photos: [],
      add: (photo) =>
        set((s) => ({
          photos: [...s.photos, { ...photo, id: `${photo.date}-${Date.now()}` }].sort((a, b) =>
            a.date < b.date ? -1 : 1,
          ),
        })),
      remove: (id) => set((s) => ({ photos: s.photos.filter((p) => p.id !== id) })),
      reset: () => set({ photos: [] }),
    }),
    { name: 'lean30:photos', storage: createJSONStorage(() => AsyncStorage) },
  ),
);