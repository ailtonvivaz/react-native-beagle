import type { ImageRequireSource } from 'react-native';
import type { ThemeMode } from '../../contexts/ThemeContext';

export type IconName =
  | 'close'
  | 'forward'
  | 'copy'
  | 'share'
  | 'chevron-right'
  | 'check-circle';

export type IconThemed = Record<ThemeMode, ImageRequireSource>;

export const icons: Record<IconName, ImageRequireSource> = {
  'close': require('./images/close.png'),
  'forward': require('./images/forward.png'),
  'copy': require('./images/copy.png'),
  'share': require('./images/share.png'),
  'chevron-right': require('./images/chevron-right.png'),
  'check-circle': require('./images/check-circle.png'),
};

export type IconSize = 'small' | 'medium' | 'large';
