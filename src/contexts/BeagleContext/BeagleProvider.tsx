import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Beagle } from '../../Beagle';
import { BeaglePlugins } from '../../BeaglePlugins';
import { ErrorLogPlugin, MessageLogPlugin } from '../../plugins';
import { useNetworkingPlugin } from '../../plugins/Networking/useNetworkingPlugin';
import { LogsModal } from '../../screens/LogsModal';
import { ThemeProvider } from '../ThemeContext';
import { BeagleContext } from './BeagleContext';
import type { BeagleProviderProps } from './types';
import { useLogs } from './useLogs';

export const BeagleProviderDisabled: React.FC<BeagleProviderProps> = ({
  children,
}) => {
  return (
    <BeagleContext.Provider
      value={{
        logs: [],
        addLog: () => {},
        showInspector: () => {},
        closeInspector: () => {},
      }}
    >
      {children}
    </BeagleContext.Provider>
  );
};

export const BeagleProviderEnabled: React.FC<BeagleProviderProps> = ({
  children,
  copy,
  theme = 'light',
}) => {
  const { logs, addLog } = useLogs();
  const [inspectorOpen, setInspectorOpen] = useState(false);

  useEffect(() => {
    BeaglePlugins.setLogAction(addLog);
  }, [addLog]);

  useEffect(() => {
    Beagle.registerPlugin(new MessageLogPlugin());
    Beagle.registerPlugin(new ErrorLogPlugin());
  }, []);

  useNetworkingPlugin();

  const showInspector = useCallback(() => {
    setInspectorOpen(true);
  }, []);

  const closeInspector = useCallback(() => {
    setInspectorOpen(false);
  }, []);

  return (
    <BeagleContext.Provider
      value={{
        logs,
        addLog,
        showInspector,
        closeInspector,
        copy,
      }}
    >
      <ThemeProvider mode={theme}>
        <>
          {children}
          {inspectorOpen && <LogsModal />}
        </>
      </ThemeProvider>
    </BeagleContext.Provider>
  );
};

export const BeagleProvider: React.FC<BeagleProviderProps> = ({
  enabled = true,
  ...props
}) => {
  BeaglePlugins.setEnabled(enabled);

  return enabled ? (
    <BeagleProviderEnabled {...props} />
  ) : (
    <BeagleProviderDisabled {...props} />
  );
};
