export type ColorMode = 'dark' | 'light';

export const palette = {
  green: {
    50: '#F4FCE0',
    100: '#E9F9C2',
    200: '#DDF3A0',
    300: '#D2ED7E',
    400: '#C6F135',
    500: '#A8D92E',
    600: '#5BA829',
    700: '#4A8F22',
    800: '#3A731C',
  },
  pink: {
    400: '#F04FD1',
    500: '#E034C0',
  },
  ink: {
    900: '#0D0F0D',
    800: '#141714',
    700: '#1A1E1A',
    600: '#22261F',
    500: '#2A2E29',
  },
  neutrals: {
    white: '#FFFFFF',
    cloud: '#9AA39A',
    mist: '#9AA39A',
    fog: '#6E766E',
    line: '#2A2E29',
    lineStrong: 'rgba(255,255,255,0.14)',
  },
  status: {
    success: '#4ADE80',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#60A5FA',
  },
} as const;

export type Gradient = readonly [string, string];

export interface AppTheme {
  mode: ColorMode;
  screen: string;
  screenAlt: string;
  card: string;
  cardElevated: string;
  cardSunken: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryStrong: string;
  primaryGradient: Gradient;
  onPrimary: string;
  accent: string;
  pink: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  heroGradient: Gradient;
  ringTrack: string;
  overlay: string;
  shimmer: readonly [string, string, string];
}

export const darkTheme: AppTheme = {
  mode: 'dark',
  screen: '#0D0F0D',
  screenAlt: '#181B18',
  card: '#181B18',
  cardElevated: '#22261F',
  cardSunken: '#12150F',
  border: palette.neutrals.line,
  borderStrong: palette.neutrals.lineStrong,
  text: '#FFFFFF',
  textSecondary: '#9AA39A',
  textTertiary: '#6E766E',
  primary: palette.green[400],
  primaryStrong: palette.green[600],
  primaryGradient: [palette.green[400], palette.green[600]],
  onPrimary: '#0A0F0A',
  accent: palette.green[400],
  pink: palette.pink[400],
  success: palette.status.success,
  warning: palette.status.warning,
  danger: palette.status.danger,
  info: palette.status.info,
  heroGradient: ['#0D0F0D', '#101A10'],
  ringTrack: 'rgba(198,241,53,0.16)',
  overlay: 'rgba(6,10,8,0.55)',
  shimmer: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)'],
};

export const lightTheme: AppTheme = {
  ...darkTheme,
  mode: 'light',
  screen: '#F6F5F0',
  screenAlt: '#EFEDE5',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  cardSunken: '#F0EEE7',
  border: 'rgba(20,30,25,0.10)',
  borderStrong: 'rgba(20,30,25,0.18)',
  text: '#141B17',
  textSecondary: '#4E5852',
  textTertiary: '#7C8680',
  primary: palette.green[600],
  primaryStrong: palette.green[700],
  onPrimary: '#FFFFFF',
  accent: palette.green[600],
  pink: palette.pink[500],
  heroGradient: ['#E9F3EC', '#F6F5F0'],
  ringTrack: 'rgba(90,168,41,0.18)',
  overlay: 'rgba(20,27,23,0.35)',
  shimmer: ['rgba(0,0,0,0.04)', 'rgba(0,0,0,0.09)', 'rgba(0,0,0,0.04)'],
};