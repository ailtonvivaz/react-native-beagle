import { useContext } from 'react';
import { LogContext } from './LogContext';

export const useLog = () => {
  const log = useContext(LogContext);

  if (!log) {
    throw new Error('useLog must be used within a LogProvider');
  }

  return log;
};
