import { useCallback, useState } from 'react';
import type { BeagleLog } from '../../types';

export const useLogs = () => {
  const [logs, setLogs] = useState<Array<BeagleLog>>([]);

  const addLog = useCallback((log: BeagleLog) => {
    setLogs((prevLogs) => {
      const index = prevLogs.findIndex((item) => item.id === log.id);
      if (index === -1) {
        return [log, ...prevLogs];
      }

      return prevLogs.map((prevLog) => {
        if (prevLog.id === log.id) {
          return log;
        }
        return prevLog;
      });
    });
  }, []);

  return {
    logs,
    addLog,
  };
};
