import { Platform } from 'react-native';
import type { DeepPartial } from '../../utils/types';

export const lightTheme = {
  colors: {
    background: '#ededed',
    header: '#f9f9f9',
    primary: '#000000',
    secondary: '#666666',
    accent: '#007bff',
    onAccent: '#ffffff',
    card: {
      header: '#e2e2e2',
      background: '#ffffff',
    },
    search: {
      background: '#e4e4e4',
      input: '#000000',
      placeholder: '#b0b0b0',
    },
    json: {
      key: 'deepskyblue',
      value: 'lightcoral',
      type: 'lightgray',
    },
    divider: '#e0e0e0',
    success: '#81C784',
    onSuccess: '#ffffff',
    error: '#EF5350',
    onError: '#ffffff',
    warning: '#FFEE58',
    onWarning: '#000000',
    info: 'lightgray',
    onInfo: '#000000',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  fonts: {
    mono: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
};

export type BaseTheme = typeof lightTheme;
export type Theme = DeepPartial<BaseTheme>;

const darkTheme: Theme = {
  colors: {
    background: '#000000',
    header: '#121212',
    primary: '#ffffff',
    secondary: '#b0b0b0',
    card: {
      header: '#232223',
      background: '#2d2d2d',
    },
    search: {
      background: '#2a2a2a',
      input: '#ffffff',
      placeholder: '#666666',
    },
    json: {
      type: 'gray',
    },
    divider: '#333333',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

export type ThemeMode = 'light' | 'dark';
export type Themes = Record<ThemeMode, Theme>;

export const themes: Themes = {
  light: lightTheme,
  dark: darkTheme,
};
