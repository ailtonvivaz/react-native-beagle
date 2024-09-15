import { createContext } from 'react';
import type { BeagleContextValue } from './types';

export const BeagleContext = createContext<BeagleContextValue | undefined>(
  undefined
);
