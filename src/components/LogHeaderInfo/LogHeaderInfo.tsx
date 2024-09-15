import { StyleSheet, View, type ViewProps } from 'react-native';

import type { BeagleLog } from '../../types';
import { Loading } from '../Loading/Loading';
import { Tag } from '../Tag/Tag';
import { Timestamp } from '../Timestamp/Timestamp';

interface LogHeaderInfoProps extends ViewProps {
  log: BeagleLog;
}

export const LogHeaderInfo: React.FC<LogHeaderInfoProps> = ({
  log,
  ...props
}) => {
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
    <View style={styles.header} {...props}>
      {/* <Typography variant="caption">{plugin.name}</Typography> */}
      <Timestamp time={log.time} />
      {renderTag()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
