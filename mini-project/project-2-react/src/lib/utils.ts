import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color utilities for the design system
export const colors = {
  // Stone-based color palette (default)
  primary: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  // Accent colors
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  // Destructive colors
  destructive: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

// CSS custom properties for the design system
export const cssVariables = {
  // Background colors
  '--background': colors.primary[50],
  '--foreground': colors.primary[900],

  // Primary colors
  '--primary': colors.primary[600],
  '--primary-foreground': colors.primary[50],

  // Secondary colors
  '--secondary': colors.primary[100],
  '--secondary-foreground': colors.primary[900],

  // Accent colors
  '--accent': colors.accent[100],
  '--accent-foreground': colors.accent[900],

  // Muted colors
  '--muted': colors.primary[100],
  '--muted-foreground': colors.primary[500],

  // Border colors
  '--border': colors.primary[200],
  '--input': colors.primary[200],
  '--ring': colors.primary[600],

  // Destructive colors
  '--destructive': colors.destructive[500],
  '--destructive-foreground': colors.destructive[50],

  // Card colors
  '--card': colors.primary[50],
  '--card-foreground': colors.primary[900],

  // Popover colors
  '--popover': colors.primary[50],
  '--popover-foreground': colors.primary[900],

  // Shadow
  '--shadow-xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '--shadow-sm':
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  '--shadow':
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '--shadow-md':
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  '--shadow-lg':
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Dark mode CSS variables
export const darkCssVariables = {
  // Background colors
  '--background': colors.primary[900],
  '--foreground': colors.primary[50],

  // Primary colors
  '--primary': colors.primary[400],
  '--primary-foreground': colors.primary[950],

  // Secondary colors
  '--secondary': colors.primary[800],
  '--secondary-foreground': colors.primary[50],

  // Accent colors
  '--accent': colors.accent[900],
  '--accent-foreground': colors.accent[50],

  // Muted colors
  '--muted': colors.primary[800],
  '--muted-foreground': colors.primary[400],

  // Border colors
  '--border': colors.primary[800],
  '--input': colors.primary[800],
  '--ring': colors.primary[400],

  // Destructive colors
  '--destructive': colors.destructive[400],
  '--destructive-foreground': colors.destructive[50],

  // Card colors
  '--card': colors.primary[900],
  '--card-foreground': colors.primary[50],

  // Popover colors
  '--popover': colors.primary[900],
  '--popover-foreground': colors.primary[50],
} as const;

// Utility function to apply CSS variables to a DOM element
export function applyTheme(element: HTMLElement, isDark = false) {
  const variables = isDark ? darkCssVariables : cssVariables;
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

// Utility function to get a color value
export function getColor(
  colorKey: keyof typeof colors,
  shade: keyof typeof colors.primary
) {
  const colorPalette = colors[colorKey];
  return colorPalette[shade as keyof typeof colorPalette];
}
