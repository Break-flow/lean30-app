# Lean30

Freemium 30-day nutrition & wellness app built with **Expo SDK 57** (RN 0.86, React 19, TypeScript).

- **Free tier**: 10 shake recipes + basic day view.
- **Premium** (RevenueCat, mock fallback): full recipe library, guided 30-day challenge, workout circuit timer, water & weight tracking, weekly reminders.

## Stack

- Expo Router (file-based navigation, `app/`)
- Zustand + AsyncStorage (local-first; no backend required to run)
- react-native-purchases (`v10`) — falls back to **mock mode** when no keys are set
- i18next — UI in `en / es / fr / pt`; recipes fall back langs → `en` → `pt`
- react-native-svg (rings + weight chart), expo-notifications (daily reminders)
- Fonts: Outfit (display) + Manrope (body). Dark-first premium design (`#0B0F0D` / emerald / gold).

## Getting started

```bash
npm install
npm run typecheck
npx expo start
```

## Environment (optional)

Create `.env` with:

```
# RevenueCat (leave empty to run in mock/premium-toggle mode)
EXPO_PUBLIC_RC_APPLE=appl_...
EXPO_PUBLIC_RC_GOOGLE=goog_...

# Optional Supabase backend (rest/anon) — everything works local-first without it
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Products configured in RevenueCat dashboard: `lean30_monthly`, `lean30_yearly`; entitlement `premium`.

## Building

```bash
npx eas build --platform android --profile preview
npx eas build --platform ios --profile preview
```

Bundle IDs: `com.lean30.app` (iOS + Android), scheme `lean30`.

## Project layout

- `app/` — routes: `onboarding`, `(app)/(tabs)` (Home, Recipes, Challenge, Progress, Profile), `recipe/[id]`, `paywall`, `workout`, `water`
- `src/content/` — recipes (free + premium), 30-day challenge plan, menus, workout circuits
- `src/stores/` — settings, profile, water, challenge, favorites, purchases
- `src/lib/` — revenuecat, supabase, notifications, dates
- `src/theme/` — colors, typography, layout tokens
- `src/i18n/` — translation resources

## Content note

All source content (products, phone numbers, brand "Receitas Para Secar", social links, claims) was sanitised and rebranded to **Lean30**. Original PDFs live at the repo root and are kept intact.