import { Typography } from '../../../components/Typography/Typography';
import type { TextContent } from '../../types';

interface TextContentViewProps {
  content: TextContent;
}

export const TextContentView: React.FC<TextContentViewProps> = ({
  content: { text, variant, bold, selectable, lines },
}) => {
  return (
    <Typography
      variant={variant}
      bold={bold}
      selectable={selectable}
      numberOfLines={lines}
    >
      {text}
    </Typography>
  );
};
