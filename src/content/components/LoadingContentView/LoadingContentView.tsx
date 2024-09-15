import { Loading } from '../../../components/Loading/Loading';
import type { LoadingContent } from '../../types';

interface LoadingContentViewProps {
  content: LoadingContent;
}

export const LoadingContentView: React.FC<LoadingContentViewProps> = ({
  content: { label, size },
}) => {
  return <Loading label={label} size={size} />;
};
