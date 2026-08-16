import { useSettings, AppLanguage } from '@/stores/settings';
import { useTranslation, initReactI18next } from 'react-i18next';

export const appLocales = ['en', 'es', 'fr', 'pt'] as const;
export type AppLocale = (typeof appLocales)[number];

export const BRAND = 'Lean30';

/** Hook that mirrors useSettings.language reactively while using react-i18next's t(). */
export function useI18n() {
  const { t } = useTranslation();
  const lang = useSettings((s) => s.language);
  return { t, lang, locale: lang as AppLocale };
}

/** Plain getter for translations outside React hooks. */
export function g(key: string, opts?: Record<string, unknown>) {
  return getI18n().t(key, opts) as string;
}

const resources = {
  en: { translation: require('./en').default },
  es: { translation: require('./es').default },
  fr: { translation: require('./fr').default },
  pt: { translation: require('./pt').default },
} as const;

export async function initI18n() {
  const m = await import('i18next');
  const ri = await import('react-i18next');
  const { initReactI18next } = ri;
  const i18next = m.default;

  const saved = useSettings.getState().language;

  i18next.use(initReactI18next).init({
    resources,
    lng: saved,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  return i18next;
}

export function getI18n() {
  // lazy accessor that initialises on first use when needed
  const mod = require('i18next') as typeof import('i18next') & { default?: typeof import('i18next') };
  const i18next = mod?.default ?? mod;
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      resources,
      lng: useSettings.getState().language,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
  }
  return i18next;
}