import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type TrackingMode = 'weight' | 'full';

export interface Measurements {
  waist?: number;
  hips?: number;
}

export interface ProfileState {
  onboarded: boolean;
  startWeight?: number;
  targetWeight?: number;
  heightCm?: number;
  trackingMode: TrackingMode;
  planStartDate: string | null;
  name: string;
  weights: Record<string, number>;
  measurements: Record<string, Measurements>;
  completeOnboarding: (p: {
    startWeight: number;
    targetWeight?: number;
    heightCm?: number;
    trackingMode: TrackingMode;
    planStartDate: string;
  }) => void;
  setName: (n: string) => void;
  logWeight: (dateKey: string, kg: number) => void;
  logMeasurements: (dateKey: string, m: Measurements) => void;
  removeWeight: (dateKey: string) => void;
  reset: () => void;
}

const initial = {
  onboarded: false,
  trackingMode: 'full' as TrackingMode,
  planStartDate: null,
  name: '',
  weights: {} as Record<string, number>,
  measurements: {} as Record<string, Measurements>,
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      ...initial,
      completeOnboarding: (p) =>
        set((s) => ({
          onboarded: true,
          ...p,
          weights: {
            ...s.weights,
            [p.planStartDate]: p.startWeight,
          },
        })),
      setName: (name) => set({ name }),
      logWeight: (dateKey, kg) =>
        set((s) => ({ weights: { ...s.weights, [dateKey]: kg } })),
      logMeasurements: (dateKey, m) =>
        set((s) => ({ measurements: { ...s.measurements, [dateKey]: m } })),
      removeWeight: (dateKey) =>
        set((s) => {
          const { [dateKey]: _drop, ...rest } = s.weights;
          return { weights: rest };
        }),
      reset: () => set({ ...initial }),
    }),
    { name: 'lean30:profile', storage: createJSONStorage(() => AsyncStorage) },
  ),
);