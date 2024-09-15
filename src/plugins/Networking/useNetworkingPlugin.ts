import { useEffect } from 'react';
import { Beagle } from '../../Beagle';
import type { BeagleLog } from '../../types';
import { NetworkingLog } from './NetworkingLog';
import { NetworkingLogPlugin } from './NetworkingLogPlugin';
import { NetworkingMonitor } from './NetworkingMonitor';

export const useNetworkingPlugin = (addLog: (log: BeagleLog) => void) => {
  useEffect(() => {
    Beagle.registerPlugin(new NetworkingLogPlugin());
  }, []);

  useEffect(() => {
    const networkingMonitor = NetworkingMonitor.getInstance()
      .onRequest(({ request, id }) => {
        addLog(new NetworkingLog(request, undefined, id));
      })
      .onResponse(({ response, request, id }) => {
        addLog(new NetworkingLog(request, response, id));
      })
      .startMonitoring();

    return () => {
      networkingMonitor.stopMonitoring();
    };
  }, [addLog]);
};
