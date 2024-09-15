import { View } from 'react-native';

import type { BoxContent } from '../../types';
import { ContentView } from '../ContentView/ContentView';

interface BoxContentViewProps {
  content: BoxContent;
}

export const BoxContentView: React.FC<BoxContentViewProps> = ({
  content: { key, children: content, direction, justifyContent },
}) => {
  return (
    <View style={{ flexDirection: direction, justifyContent }} key={key}>
      {content.map((child, index) => (
        <ContentView content={child} key={`${key}_${index}`} />
      ))}
    </View>
  );
};
