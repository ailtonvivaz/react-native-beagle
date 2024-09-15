import { useCallback, useMemo } from 'react';
import { Modal, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomBar } from '../components/BottomBar/BottomBar';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { LogHeaderInfo } from '../components/LogHeaderInfo/LogHeaderInfo';
import { Typography } from '../components/Typography/Typography';
import { DetailContentView } from '../content/components/DetailContentView/DetailContentView';
import { useLog } from '../contexts/LogContext/useLog';
import { useThemedStyles, type BaseTheme } from '../contexts/ThemeContext';

interface LogModalProps {
  onRequestClose: () => void;
}

export const LogModal: React.FC<LogModalProps> = ({ onRequestClose }) => {
  const { log, plugin } = useLog();
  const styles = useThemedStyles(themedStyles);

  const content = useMemo(() => {
    return plugin.provideDetailContent(log);
  }, [log, plugin]);

  const onSharePress = useCallback(async () => {
    await Share.share({
      message: plugin.exportToJSON(log),
      title: log.message,
    });
  }, [log, plugin]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onRequestClose}
      statusBarTranslucent
      presentationStyle="formSheet"
      style={styles.root}
    >
      <Header title={log.message} onClosePress={onRequestClose} />
      <LogHeaderInfo log={log} style={styles.header} />

      <View style={styles.container}>
        <DetailContentView content={content} />
      </View>

      <BottomBar justifyContent="space-between">
        <Typography variant="caption">{plugin.name}</Typography>
        <TouchableOpacity onPress={onSharePress}>
          <Icon icon="share" size="medium" />
        </TouchableOpacity>
      </BottomBar>
    </Modal>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.header,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.primary,
    },
  });
