import { createContext } from 'react';
import type { ThemeMode } from './themes';

export const ThemeContext = createContext<ThemeMode>('light');
