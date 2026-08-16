import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getPremiumStatus, initRevenueCat, purchase, restorePurchases, type PremiumState } from '@/lib/revenuecat';

export type PurchaseStatus = 'unknown' | 'loading';

interface PurchasesState {
  isPremium: boolean;
  mode: 'real' | 'mock';
  state: PremiumState;
  subscribing: boolean;
  restoring: boolean;
  error?: string;
  init: () => Promise<void>;
  subscribe: (productId?: 'monthly' | 'yearly') => Promise<boolean>;
  restore: () => Promise<boolean>;
  /** dev/mock only — simulate toggling premium */
  setMockPremium: (v: boolean) => void;
  refresh: () => Promise<void>;
}

function premiumOf(state: PremiumState): boolean {
  return state.status === 'active';
}

export const usePurchases = create<PurchasesState>()(
  persist(
    (set, get) => ({
      isPremium: false,
      mode: 'mock',
      state: { status: 'unknown', packages: {} },
      subscribing: false,
      restoring: false,
      init: async () => {
        const mode = await initRevenueCat();
        set({ mode });
        if (mode === 'mock') {
          set((s) => ({ isPremium: s.isPremium })); // keep persisted value in mock mode
          return;
        }
        const state = await getPremiumStatus();
        set({ state, isPremium: premiumOf(state) });
      },
      subscribe: async (productId = 'yearly') => {
        if (get().mode !== 'real') {
          // mock path
          set({ isPremium: true });
          return true;
        }
        set({ subscribing: true, error: undefined });
        try {
          const pkg = productId === 'monthly' ? get().state.packages.monthly : get().state.packages.yearly;
          const state = await purchase(pkg);
          set({ state, isPremium: premiumOf(state), subscribing: false });
          return premiumOf(state);
        } catch (err) {
          set({ subscribing: false, error: (err as Error)?.message ?? 'Purchase failed' });
          return false;
        }
      },
      restore: async () => {
        if (get().mode !== 'real') {
          set({ isPremium: true, restoring: false });
          return true;
        }
        set({ restoring: true, error: undefined });
        try {
          const state = await restorePurchases();
          set({ state, isPremium: premiumOf(state), restoring: false });
          return premiumOf(state);
        } catch (err) {
          set({ restoring: false, error: (err as Error)?.message ?? 'Restore failed' });
          return false;
        }
      },
      refresh: async () => {
        if (get().mode === 'real') {
          const state = await getPremiumStatus();
          set({ state, isPremium: premiumOf(state) });
        }
      },
      setMockPremium: (v) => {
        if (get().mode === 'mock') set({ isPremium: v });
      },
    }),
    {
      name: 'lean30:purchases',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ isPremium: s.isPremium, mode: s.mode }),
    },
  ),
);