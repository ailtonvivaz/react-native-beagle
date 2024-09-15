import * as Clipboard from 'expo-clipboard';
import { useEffect } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Beagle, BeagleProvider, MessageLog } from 'react-native-beagle';
import { AnalyticsLogPlugin } from './plugins/Analytics/AnalyticsLogPlugin';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  const theme = useColorScheme();

  useEffect(() => {
    Beagle.log(new MessageLog('App loaded', 'info'));
  }, []);

  useEffect(() => {
    Beagle.registerPlugin(new AnalyticsLogPlugin());
  }, []);

  const copy = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  return (
    <BeagleProvider theme={theme ?? 'light'} copy={copy}>
      <View style={styles.root}>
        <HomeScreen />
      </View>
    </BeagleProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
