import type { DetailContent } from '../../types';
import { ListContentView } from '../ListContentView/ListContentView';
import { TabBarContentView } from '../TabBarContentView/TabBarContentView';

interface DetailContentViewProps {
  content: DetailContent;
}

export const DetailContentView: React.FC<DetailContentViewProps> = ({
  content,
}) => {
  if (content.kind === 'tab-bar') {
    return <TabBarContentView content={content} />;
  }

  return <ListContentView content={content} />;
};
