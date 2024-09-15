import { BeaglePlugins } from '../../BeaglePlugins';
import { LogContext } from './LogContext';
import type { LogProviderProps } from './types';

export const LogProvider: React.FC<LogProviderProps> = ({ children, log }) => {
  const plugin = BeaglePlugins.findPlugin(log);

  return (
    <LogContext.Provider
      value={{
        log,
        plugin,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
