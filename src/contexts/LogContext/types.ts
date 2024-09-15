import type { BeagleLog } from '../../types';
import type { BeagleLogPlugin } from '../../types/LogPlugin';

export interface LogContextValue {
  log: BeagleLog;
  plugin: BeagleLogPlugin<BeagleLog>;
}

export interface LogProviderProps {
  log: BeagleLog;
  children: React.ReactElement;
}
