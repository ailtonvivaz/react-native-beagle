import { createContext } from 'react';
import type { LogContextValue } from './types';

export const LogContext = createContext<LogContextValue | undefined>(undefined);
