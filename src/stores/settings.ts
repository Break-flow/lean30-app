import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { scheduleDailyReminders, clearAllReminders, configureNotifications } from '@/lib/notifications';

function getI18n() {
  const mod = require('@/i18n') as typeof import('@/i18n');
  return mod.getI18n();
}

export type AppLanguage = 'en' | 'es' | 'fr' | 'pt';
export type AppMode = 'dark' | 'light';

interface SettingsState {
  language: AppLanguage;
  mode: AppMode;
  hydrated: boolean;
  reminders: boolean;
  setLanguage: (l: AppLanguage) => void;
  setMode: (m: AppMode) => void;
  setReminders: (on: boolean) => Promise<boolean>;
  hydrate: () => Promise<void>;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      language: 'pt',
      mode: 'dark',
      hydrated: false,
      reminders: false,
      setLanguage: (language) => {
        set({ language });
        getI18n().changeLanguage(language);
      },
      setMode: (mode) => set({ mode }),
      setReminders: async (on) => {
        if (on) {
          const ok = await scheduleDailyReminders({
            waterGoal: 2000,
            waterLabel: getI18n().t('water.title') as string,
            mealLabel: (meal: string) => getI18n().t(`challenge.${meal}`) as string,
          });
          set({ reminders: ok });
          return ok;
        }
        await clearAllReminders();
        set({ reminders: false });
        return true;
      },
      hydrate: async () => {
        await configureNotifications().catch(() => {});
        set({ hydrated: true });
      },
    }),
    {
      name: 'lean30:settings',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useSettings.setState({ hydrated: true });
      },
    },
  ),
);