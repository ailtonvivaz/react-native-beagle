import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps } from './types';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  mode = 'light',
  children,
}) => {
  return <ThemeContext.Provider value={mode}>{children}</ThemeContext.Provider>;
};
