/**
 * App theme colors — mapped from Novalith Labs palette.
 * Prefer `palette` from `@/brand` when adding new colors.
 */

import { Platform } from 'react-native';

import { palette } from '@/brand';

export const Colors = {
  light: {
    text: palette.textPrimary,
    background: palette.background,
    surface: palette.surface,
    surfaceAlt: palette.borderSubtle,
    border: palette.border,
    primary: palette.primary,
    primaryText: palette.textInverse,
    muted: palette.textSecondary,
    danger: palette.danger,
    inputBackground: palette.surface,
    inputText: palette.textPrimary,
    tint: palette.primary,
    icon: palette.textSecondary,
    tabIconDefault: palette.textSecondary,
    tabIconSelected: palette.primary,
  },
  dark: {
    text: palette.textPrimaryDark,
    background: palette.backgroundDark,
    surface: palette.surfaceDark,
    surfaceAlt: palette.borderSubtleDark,
    border: palette.borderDark,
    primary: palette.primaryOnDark,
    primaryText: palette.backgroundDark,
    muted: palette.textSecondaryDark,
    danger: '#F87171',
    inputBackground: palette.borderSubtleDark,
    inputText: palette.textPrimaryDark,
    tint: palette.primaryOnDark,
    icon: palette.textSecondaryDark,
    tabIconDefault: palette.textSecondaryDark,
    tabIconSelected: palette.primaryOnDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    heading: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    heading: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    heading: "Manrope, Inter, system-ui, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
