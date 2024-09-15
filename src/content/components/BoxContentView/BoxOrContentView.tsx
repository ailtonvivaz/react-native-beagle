import type { BoxContent, Content } from '../../types';
import { ContentView } from '../ContentView/ContentView';
import { BoxContentView } from './BoxContentView';

interface BoxOrContentViewProps {
  content: BoxContent | Content;
}

export const BoxOrContentView: React.FC<BoxOrContentViewProps> = ({
  content,
}) => {
  if (content.kind === 'box') return <BoxContentView content={content} />;
  return <ContentView content={content} />;
};
