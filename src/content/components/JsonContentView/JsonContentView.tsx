import { View } from 'react-native';
import { JsonViewer } from '../../../components/JsonViewer/JsonViewer';
import type { JsonContent } from '../../types';

interface JsonContentViewProps {
  content: JsonContent;
}

export const JsonContentView: React.FC<JsonContentViewProps> = ({
  content: { data, expanded },
}) => {
  return (
    <View>
      <JsonViewer data={data} expanded={expanded} />
    </View>
  );
};
