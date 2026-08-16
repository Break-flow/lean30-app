import { Platform, TextStyle } from 'react-native';

export const fonts = {
  display: 'Poppins_700Bold',
  displayMedium: 'Poppins_600SemiBold',
  displayLight: 'Poppins_300Light',
  body: 'Manrope_500Medium',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  system: Platform.select({ default: undefined }),
} as const;

export const letterSpacing = {
  tight: -0.6,
  normal: -0.2,
  wide: 0.6,
  caps: 1.6,
} as const;

export const type = {
  heading: {
    fontFamily: fonts.displayMedium,
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: letterSpacing.tight,
  },
  display: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: letterSpacing.tight,
  },
  displayXL: {
    fontFamily: fonts.display,
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: letterSpacing.tight,
  },
  displayL: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: letterSpacing.tight,
  },
  displayM: {
    fontFamily: fonts.display,
    fontSize: 27,
    lineHeight: 32,
    letterSpacing: letterSpacing.tight,
  },
  displayS: {
    fontFamily: fonts.displayMedium,
    fontSize: 21,
    lineHeight: 26,
    letterSpacing: letterSpacing.normal,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: letterSpacing.normal,
  },
  bodyS: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: letterSpacing.wide,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: letterSpacing.caps,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  lead: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: letterSpacing.caps,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
  stat: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: letterSpacing.tight,
  },
  statL: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: letterSpacing.tight,
  },
} as const;