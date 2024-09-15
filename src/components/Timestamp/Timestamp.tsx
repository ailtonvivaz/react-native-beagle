import { Typography } from '../Typography/Typography';

interface TimestampProps {
  time: Date;
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
}

export const Timestamp: React.FC<TimestampProps> = ({
  time,
  dateStyle,
  timeStyle,
}) => {
  const dateFormater = new Intl.DateTimeFormat(undefined, {
    dateStyle,
    ...(!timeStyle && !dateStyle ? { timeStyle: 'long' } : { timeStyle }),
  });

  return <Typography variant="caption">{dateFormater.format(time)}</Typography>;
};
