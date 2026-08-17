type SentryApi = {
  init: (opts: Record<string, unknown>) => void;
  setUser: (u: { id: string; email?: string; username?: string } | null) => void;
  addBreadcrumb: (b: { category: string; message: string; data?: Record<string, unknown>; level: string }) => void;
  reactNativeIntegration?: (opts: Record<string, unknown>) => unknown;
};

let Sentry: SentryApi | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('@sentry/react-native') as SentryApi;
  Sentry = mod;
} catch {
  Sentry = null;
}

export function initSentry() {
  if (!Sentry) {
    if (__DEV__) console.log('[Sentry] not available, skipping');
    return;
  }

  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    if (__DEV__) console.log('[Sentry] DSN not configured, skipping');
    return;
  }

  Sentry.init({
    dsn,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    debug: __DEV__,
    environment: __DEV__ ? 'development' : 'production',
    release: `lean30@${process.env.EXPO_PUBLIC_APP_VERSION ?? '1.0.0'}`,
    integrations: [
      Sentry.reactNativeIntegration?.({ enableAutoPerformanceTracking: true }),
    ].filter(Boolean),
    beforeSend(event: any) {
      if (__DEV__) console.log('[Sentry] Sending event:', event.exception?.values?.[0]?.value ?? 'unknown');
      return event;
    },
  });
}

export function setSentryUser(user: { id: string; email?: string; username?: string } | null) {
  if (!Sentry) return;
  if (user) Sentry.setUser(user);
  else Sentry.setUser(null);
}

export function addSentryBreadcrumb(category: string, message: string, data?: Record<string, unknown>) {
  if (!Sentry) return;
  Sentry.addBreadcrumb({ category, message, data, level: 'info' });
}