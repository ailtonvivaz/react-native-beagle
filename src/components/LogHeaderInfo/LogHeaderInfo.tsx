import { StyleSheet, View } from 'react-native';

import { useLog } from '../../contexts/LogContext/useLog';
import { Loading } from '../Loading/Loading';
import { Tag } from '../Tag/Tag';
import { Typography } from '../Typography/Typography';

export const LogHeaderInfo = () => {
  const { log, plugin } = useLog();

  const renderTag = () => {
    switch (log.level) {
      case 'loading':
        return <Loading size={12} />;
      case 'info':
        return <Tag style="info">Info</Tag>;
      case 'warning':
        return <Tag style="warning">Warning</Tag>;
      case 'error':
        return <Tag style="error">Error</Tag>;
      case 'success':
        return <Tag style="success">Success</Tag>;
    }
  };

  return (
    <View style={styles.root}>
      <Typography variant="caption">{plugin.name}</Typography>
      {renderTag()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
