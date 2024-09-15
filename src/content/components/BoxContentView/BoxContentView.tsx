import { View } from 'react-native';

import { nanoid } from '../../../utils/nanoid';
import type { BoxContent } from '../../types';
import { ContentView } from '../ContentView/ContentView';

interface BoxContentViewProps {
  content: BoxContent;
}

export const BoxContentView: React.FC<BoxContentViewProps> = ({
  content: { children: content, direction, justifyContent },
}) => {
  const randomKey = nanoid();
  return (
    <View style={{ flexDirection: direction, justifyContent }}>
      {content.map((child, index) => (
        <ContentView content={child} key={`${randomKey}_${index}`} />
      ))}
    </View>
  );
};
