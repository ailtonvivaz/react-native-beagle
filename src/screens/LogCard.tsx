import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LogHeaderInfo } from '../components/LogHeaderInfo/LogHeaderInfo';
import { Typography } from '../components/Typography/Typography';
import { BoxOrContentView } from '../content/components/BoxContentView/BoxOrContentView';
import { useLog } from '../contexts/LogContext/useLog';
import { useThemedStyles, type BaseTheme } from '../contexts/ThemeContext';

export const LogCard = () => {
  const { log, plugin } = useLog();
  const styles = useThemedStyles(themedStyles);

  const footerContent = useMemo(
    () => plugin.provideCardFooter(log),
    [log, plugin]
  );

  return (
    <View style={styles.card}>
      <LogHeaderInfo log={log} />
      <View style={styles.content}>
        <Typography numberOfLines={2}>{log.message}</Typography>
      </View>
      {footerContent && <BoxOrContentView content={footerContent} />}
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    card: {
      padding: 10,
      backgroundColor: theme.colors.card.background,
      borderRadius: 8,
      gap: 4,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  });
