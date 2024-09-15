import { useMemo } from 'react';
import { Animated, Image, StyleSheet, type ColorValue } from 'react-native';
import { useTheme, useThemedStyles } from '../../contexts/ThemeContext';
import { icons, type IconName, type IconSize } from './types';

export interface IconProps {
  icon: IconName;
  size?: IconSize;
  color?: ColorValue;
  animated?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 'small',
  color,
  animated,
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(themedStyles);

  const ImageContainer = animated ? Animated.Image : Image;

  const source = icons[icon];
  const iconStyle = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.iconSmall;
      case 'medium':
        return styles.iconMedium;
      case 'large':
        return styles.iconLarge;
    }
  }, [size, styles]);

  const iconColor = useMemo(() => {
    return color ?? theme.colors.primary;
  }, [color, theme.colors.primary]);

  return (
    <ImageContainer
      source={source}
      style={[iconStyle, { tintColor: iconColor }]}
    />
  );
};

const themedStyles = () =>
  StyleSheet.create({
    iconSmall: {
      width: 16,
      height: 16,
    },
    iconMedium: {
      width: 24,
      height: 24,
    },
    iconLarge: {
      width: 30,
      height: 30,
    },
  });
