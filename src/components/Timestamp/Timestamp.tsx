import { Typography } from '../Typography/Typography';

interface TimestampProps {
  time: Date;
}

const dateFormater = new Intl.DateTimeFormat(undefined, {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
});

export const Timestamp: React.FC<TimestampProps> = ({ time }) => {
  return <Typography variant="caption">{dateFormater.format(time)}</Typography>;
};
