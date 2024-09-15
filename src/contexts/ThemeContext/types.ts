import type { ThemeMode } from './themes';

export interface ThemeProviderProps {
  mode: ThemeMode;
  children: React.ReactElement;
}
