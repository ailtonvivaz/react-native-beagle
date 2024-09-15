import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Header } from '../components/Header/Header';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { useInternalBeagle } from '../contexts/BeagleContext/useBeagle';
import { LogProvider } from '../contexts/LogContext/LogProvider';
import { useThemedStyles, type BaseTheme } from '../contexts/ThemeContext';
import type { BeagleLog } from '../types';
import { LogCard } from './LogCard';
import { LogModal } from './LogModal';

export const LogsModal = () => {
  const { logs, closeInspector } = useInternalBeagle();

  const styles = useThemedStyles(themedStyles);
  const [selectedLog, setSelectedLog] = useState<BeagleLog | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [logs]);

  const filteredLogs = useMemo(() => {
    if (!search) {
      return logs;
    }

    return logs.filter((log) => log.filter(search));
  }, [logs, search]);

  useEffect(() => {
    if (!selectedLog) return;

    const updatedLog = logs.find((log) => log.id === selectedLog.id);
    setSelectedLog(updatedLog || null);
  }, [selectedLog, logs]);

  const onLogPress = (log: BeagleLog) => {
    setSelectedLog(log);
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={closeInspector}
      statusBarTranslucent
      presentationStyle="formSheet"
      style={styles.root}
    >
      <Header title="Beagle" onClosePress={closeInspector} />
      <SearchBar onSearch={setSearch} />
      <View style={styles.container}>
        <FlatList
          pagingEnabled={true}
          data={filteredLogs}
          renderItem={({ item }) => (
            <LogProvider log={item} key={`log_card_${item.id}`}>
              <Pressable onPress={() => onLogPress(item)}>
                <LogCard />
              </Pressable>
            </LogProvider>
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      {selectedLog && (
        <LogProvider log={selectedLog}>
          <LogModal onRequestClose={() => setSelectedLog(null)} />
        </LogProvider>
      )}
    </Modal>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContentContainer: {
      gap: 8,
      padding: 16,
    },
  });
