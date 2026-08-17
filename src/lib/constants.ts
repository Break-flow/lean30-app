// App constants & configuration
// Fill the EXPO_PUBLIC_* values in .env to enable cloud features.
// Without them, the app runs in local-first / mock mode.

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const REVENUECAT = {
  enabled: Boolean(
    process.env.EXPO_PUBLIC_RC_APPLE ||
      process.env.EXPO_PUBLIC_RC_GOOGLE ||
      process.env.EXPO_PUBLIC_REVENUECAT_APPLE ||
      process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE
  ),
  apple:
    process.env.EXPO_PUBLIC_RC_APPLE ??
    process.env.EXPO_PUBLIC_REVENUECAT_APPLE ??
    '',
  google:
    process.env.EXPO_PUBLIC_RC_GOOGLE ??
    process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE ??
    '',
};

export const ENTITLEMENT_PREMIUM = 'premium';
export const PRODUCT_MONTHLY = 'lean30_monthly';
export const PRODUCT_YEARLY = 'lean30_yearly';

export const WATER_GLASS_ML = 250;
export const CHALLENGE_DAYS = 30;