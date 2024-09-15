import { Typography } from '../../../components/Typography/Typography';
import type { LabelContent } from '../../types';

interface LabelContentViewProps {
  content: LabelContent;
}

export const LabelContentView: React.FC<LabelContentViewProps> = ({
  content: { label, value },
}) => {
  return (
    <Typography variant="body" bold selectable>
      {label}
      {': '}
      <Typography bold={false}>{value}</Typography>
    </Typography>
  );
};
