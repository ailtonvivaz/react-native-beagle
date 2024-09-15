import { useEffect } from 'react';
import { Beagle } from '../../Beagle';
import { ErrorLog } from '../Error/ErrorLog';
import { NetworkingLog } from './NetworkingLog';
import { NetworkingLogPlugin } from './NetworkingLogPlugin';
import { NetworkingMonitor } from './NetworkingMonitor';
import type { NetworkingRequest, NetworkingResponse } from './types';

export const useNetworkingPlugin = () => {
  useEffect(() => {
    Beagle.registerPlugin(new NetworkingLogPlugin());
  }, []);

  useEffect(() => {
    const addLog = (
      request: NetworkingRequest,
      response?: NetworkingResponse,
      id?: string
    ) => {
      try {
        const log = new NetworkingLog(request, response, id);
        Beagle.log(log);
      } catch (e) {
        const error = new Error('Error while logging networking request', {
          cause: e,
        });
        Beagle.log(new ErrorLog(error));
      }
    };

    const networkingMonitor = NetworkingMonitor.getInstance()
      .onRequest(({ request, id }) => addLog(request, undefined, id))
      .onResponse(({ response, request, id }) => addLog(request, response, id))
      .startMonitoring();

    return () => {
      networkingMonitor.stopMonitoring();
    };
  }, []);
};
