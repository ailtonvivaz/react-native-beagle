import { useContext } from 'react';
import { deepMerge } from '../../utils/deepMerge';
import { ThemeContext } from './ThemeContext';
import { lightTheme, themes, type BaseTheme } from './themes';

export const useTheme = () => {
  const mode = useContext(ThemeContext);
  const theme = themes[mode];

  return {
    mode: mode,
    theme: deepMerge(lightTheme, theme),
  };
};

export const useThemedStyles = <T>(styles: (theme: BaseTheme) => T) => {
  const { theme } = useTheme();
  return styles(theme);
};
