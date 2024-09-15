import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  useTheme,
  useThemedStyles,
  type BaseTheme,
} from '../../contexts/ThemeContext';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import type { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  title,
  onClosePress,
  children,
}) => {
  const { mode } = useTheme();
  const styles = useThemedStyles(themedStyles);

  return (
    <>
      <StatusBar
        barStyle={
          mode === 'dark' || Platform.OS === 'ios'
            ? 'light-content'
            : 'dark-content'
        }
      />
      <View style={styles.root}>
        <SafeAreaView>
          <View style={styles.container}>
            <Typography
              variant="headline"
              numberOfLines={1}
              style={styles.title}
            >
              {title}
            </Typography>
            <Pressable onPress={onClosePress} style={styles.action}>
              {true && <Icon icon="close" />}
            </Pressable>
          </View>
          {children && <View style={styles.children}>{children}</View>}
        </SafeAreaView>
      </View>
    </>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.header,
      paddingHorizontal: 16,
      paddingVertical: 8,
      paddingTop: 8 + (StatusBar.currentHeight ?? 0),
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      marginLeft: 24,
      paddingVertical: 8,
    },
    back: {
      padding: 8,
      backgroundColor: theme.colors.card.background,
      borderRadius: 20,
      marginRight: 8,
    },
    action: {
      padding: 8,
      backgroundColor: theme.colors.search.background,
      borderRadius: 20,
    },
    children: {
      paddingVertical: 8,
    },
  });
