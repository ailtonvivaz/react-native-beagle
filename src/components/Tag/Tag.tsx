import { StyleSheet, View } from 'react-native';
import type { BaseTheme } from '../../contexts/ThemeContext';
import { useThemedStyles } from '../../contexts/ThemeContext';
import { Typography } from '../Typography/Typography';

export type TagStyle = 'success' | 'error' | 'warning' | 'info';

export interface TagProps {
  style?: TagStyle;
  children: string;
}
export const Tag: React.FC<TagProps> = ({ style = 'info', children }) => {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.container, styles[style]]}>
      <Typography variant="caption" style={styles[`on${style}`]}>
        {children}
      </Typography>
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginVertical: -2,
    },
    success: {
      backgroundColor: theme.colors.success,
      color: 'white',
    },
    error: {
      backgroundColor: theme.colors.error,
    },
    warning: {
      backgroundColor: theme.colors.warning,
    },
    info: {
      backgroundColor: theme.colors.info,
    },
    onsuccess: {
      color: theme.colors.onSuccess,
    },
    onerror: {
      color: theme.colors.onError,
    },
    onwarning: {
      color: theme.colors.onWarning,
    },
    oninfo: {
      color: theme.colors.onInfo,
    },
  });
