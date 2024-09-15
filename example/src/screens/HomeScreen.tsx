import { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { Beagle, MessageLog, useBeagle } from 'react-native-beagle';
import { AnalyticsLog } from '../plugins/Analytics/types';
import { request } from './request';

export const HomeScreen = () => {
  const { showInspector } = useBeagle();

  const onSampleGetPress = () => {
    request({ url: 'https://reqres.in/api/users' });
    showInspector();
  };

  const onSamplePostPress = () => {
    request({
      url: 'https://reqres.in/api/users',
      method: 'POST',
      body: {
        name: 'morpheus',
        job: 'leader',
      },
    });
    showInspector();
  };

  const onSampleErrorPress = () => {
    request({ url: 'https://reqres.in/api/unknown/23' });
    showInspector();
  };

  const onSampleDelayPress = () => {
    request({ url: 'https://reqres.in/api/users?delay=3' });
    showInspector();
  };

  const onSampleLogPress = () => {
    Beagle.log(new MessageLog('Test', 'warning'));
    showInspector();
  };

  const onSampleAnalyticsPress = () => {
    Beagle.log(new AnalyticsLog('App Open', { test: 'test' }));
    showInspector();
  };

  useEffect(() => {
    Beagle.log(new MessageLog('HomeScreen loaded', 'info'));
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Button title="SAMPLE GET" onPress={onSampleGetPress} />
        <Button title="SAMPLE POST" onPress={onSamplePostPress} />
        <Button title="SAMPLE ERROR" onPress={onSampleErrorPress} />
        <Button title="SAMPLE DELAY" onPress={onSampleDelayPress} />
        <Button title="SAMPLE LOG" onPress={onSampleLogPress} />
        <Button title="SAMPLE ANALYTICS" onPress={onSampleAnalyticsPress} />
      </View>
      <Button title="Open Inspector" onPress={showInspector} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
