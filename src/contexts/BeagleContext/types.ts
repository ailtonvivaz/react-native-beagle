import type { BeagleLog } from '../../types';
import type { ThemeMode } from '../ThemeContext';

export type CopyAction = (value: string) => Promise<void>;

export interface BeagleContextValue {
  logs: Array<BeagleLog>;
  addLog: (log: BeagleLog) => void;
  showInspector: () => void;
  closeInspector: () => void;
  copy?: CopyAction;
}

export interface BeagleProviderProps {
  enabled?: boolean;
  copy?: CopyAction;
  theme?: ThemeMode;
  children: React.ReactElement;
}
