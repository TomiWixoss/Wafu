/**
 * Wafu Design System — Design Tokens
 * Flat, muted, premium aesthetic. No gradients.
 */

// ───────────────────────────── Colors ─────────────────────────────

export const COLORS = {
  // Primary (Indigo)
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
    950: '#1E1B4B',
  },

  // Neutrals (Warm slate)
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Semantic
  success: { light: '#ECFDF5', main: '#10B981', dark: '#065F46' },
  warning: { light: '#FFFBEB', main: '#F59E0B', dark: '#92400E' },
  error: { light: '#FEF2F2', main: '#EF4444', dark: '#991B1B' },
  info: { light: '#EFF6FF', main: '#3B82F6', dark: '#1E40AF' },
} as const;

// Background & surface tokens
export const SURFACES = {
  light: {
    bg: COLORS.neutral[50],
    bgSecondary: COLORS.neutral[100],
    card: COLORS.neutral[0],
    cardHover: COLORS.neutral[100],
    input: COLORS.neutral[0],
    inputBorder: COLORS.neutral[200],
    inputFocus: COLORS.primary[500],
    divider: COLORS.neutral[200],
  },
  dark: {
    bg: COLORS.neutral[950],
    bgSecondary: COLORS.neutral[900],
    card: COLORS.neutral[800],
    cardHover: COLORS.neutral[700],
    input: COLORS.neutral[800],
    inputBorder: COLORS.neutral[700],
    inputFocus: COLORS.primary[400],
    divider: COLORS.neutral[700],
  },
} as const;

// Text tokens
export const TEXT_COLORS = {
  light: {
    primary: COLORS.neutral[900],
    secondary: COLORS.neutral[600],
    tertiary: COLORS.neutral[400],
    inverse: COLORS.neutral[0],
    accent: COLORS.primary[600],
  },
  dark: {
    primary: COLORS.neutral[50],
    secondary: COLORS.neutral[400],
    tertiary: COLORS.neutral[600],
    inverse: COLORS.neutral[900],
    accent: COLORS.primary[400],
  },
} as const;

// ───────────────────────────── Spacing ─────────────────────────────

export const SPACING = {
  '2xs': 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
  '7xl': 64,
} as const;

// ───────────────────────────── Typography ─────────────────────────────

export const FONT_FAMILY = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  black: 'Inter_900Black',
} as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const LINE_HEIGHT = {
  xs: 16,
  sm: 18,
  base: 22,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 38,
  '4xl': 44,
} as const;

export const TYPOGRAPHY = {
  display: {
    fontFamily: FONT_FAMILY.black,
    fontSize: FONT_SIZE['4xl'],
    lineHeight: LINE_HEIGHT['4xl'],
  },
  h1: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE['3xl'],
    lineHeight: LINE_HEIGHT['3xl'],
  },
  h2: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE['2xl'],
    lineHeight: LINE_HEIGHT['2xl'],
  },
  h3: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
  },
  subtitle: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.base,
    lineHeight: LINE_HEIGHT.base,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.base,
    lineHeight: LINE_HEIGHT.base,
  },
  bodySm: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
  },
  label: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
  button: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.base,
    lineHeight: LINE_HEIGHT.base,
  },
  buttonSm: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
} as const;

// ───────────────────────────── Border Radius ─────────────────────────────

export const RADII = {
  none: 0,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ───────────────────────────── Shadows ─────────────────────────────

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

// ───────────────────────────── Animation ─────────────────────────────

export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 400,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.8,
  },
  pressScale: 0.97,
} as const;

// ───────────────────────────── Icon Sizes ─────────────────────────────

export const ICON_SIZE = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

// ───────────────────────────── Avatar Sizes ─────────────────────────────

export const AVATAR_SIZE = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  '2xl': 72,
  '3xl': 96,
  '4xl': 128,
} as const;
