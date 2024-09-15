import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useInternalBeagle } from '../../contexts/BeagleContext/useBeagle';
import { useTheme } from '../../contexts/ThemeContext';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

interface CopyButtonProps {
  text: () => string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const { theme } = useTheme();
  const { copy } = useInternalBeagle();
  const [copied, setCopied] = useState(false);
  const opacityCopied = useRef(new Animated.Value(0)).current;
  const opacityCopy = opacityCopied.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    Animated.timing(opacityCopied, {
      toValue: copied ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [copied, opacityCopied]);

  if (!copy) {
    return null;
  }

  const onCopyPress = async () => {
    await copy(text());
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <Pressable onPress={onCopyPress}>
      <View style={styles.container}>
        <Animated.View style={[styles.iconTextPair, { opacity: opacityCopy }]}>
          <Icon icon={'copy'} color={theme.colors.secondary} />
          <Typography variant="caption">Copy</Typography>
        </Animated.View>
        <Animated.View
          style={[
            styles.iconTextPair,
            styles.overlayPair,
            { opacity: opacityCopied },
          ]}
        >
          <Icon icon="check-circle" color={theme.colors.secondary} />
          <Typography variant="caption">Copied</Typography>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  iconTextPair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayPair: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
