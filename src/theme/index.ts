import { useSettings } from '@/stores/settings';
import { darkTheme, lightTheme, type AppTheme } from './colors';
import { fonts, type, letterSpacing } from './typography';
import { spacing, radius, layout } from './layout';

export function useAppTheme(): AppTheme {
  const mode = useSettings((s) => s.mode);
  return mode === 'dark' ? darkTheme : lightTheme;
}

export { darkTheme, lightTheme, fonts, type, spacing, radius, layout, letterSpacing };
export type { AppTheme };