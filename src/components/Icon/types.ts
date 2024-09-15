import type { ImageRequireSource } from 'react-native';
import type { ThemeMode } from '../../contexts/ThemeContext';

export type IconName =
  | 'close'
  | 'copy'
  | 'share'
  | 'check-circle'
  | 'arrow-down';

export type IconThemed = Record<ThemeMode, ImageRequireSource>;

export const icons: Record<IconName, ImageRequireSource> = {
  'close': require('./images/close.png'),
  'copy': require('./images/copy.png'),
  'share': require('./images/share.png'),
  'check-circle': require('./images/check-circle.png'),
  'arrow-down': require('./images/arrow-down.png'),
};

export type IconSize = 'small' | 'medium' | 'large';
