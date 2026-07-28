/**
 * Novalith Labs color palette — single source of truth.
 * Do not hardcode these hex values in components; use tokens / theme colors.
 */

export const palette = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryActive: '#1E40AF',
  primarySoft: 'rgba(37, 99, 235, 0.10)',

  secondary: '#7C3AED',
  secondaryHover: '#6D28D9',
  secondarySoft: 'rgba(124, 58, 237, 0.10)',

  accent: '#06B6D4',
  accentHover: '#0891B2',
  accentSoft: 'rgba(6, 182, 212, 0.12)',

  success: '#10B981',
  successSoft: 'rgba(16, 185, 129, 0.12)',

  warning: '#F59E0B',
  warningSoft: 'rgba(245, 158, 11, 0.12)',

  danger: '#EF4444',
  dangerSoft: 'rgba(239, 68, 68, 0.12)',

  background: '#F8FAFC',
  backgroundDark: '#0F172A',

  surface: '#FFFFFF',
  surfaceDark: '#1E293B',
  surfaceElevatedLight: 'rgba(255, 255, 255, 0.78)',
  surfaceElevatedDark: 'rgba(30, 41, 59, 0.82)',

  border: '#E2E8F0',
  borderDark: '#334155',
  borderSubtle: '#F1F5F9',
  borderSubtleDark: '#1E293B',

  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textPrimaryDark: '#F8FAFC',
  textSecondaryDark: '#94A3B8',
  textInverse: '#FFFFFF',

  focusRing: 'rgba(37, 99, 235, 0.45)',
  focusRingDark: 'rgba(96, 165, 250, 0.45)',

  /** Light-mode primary tint used on dark surfaces (tabs, icons) */
  primaryOnDark: '#60A5FA',
} as const;

export type PaletteKey = keyof typeof palette;
