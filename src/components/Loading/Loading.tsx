import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Typography } from '../Typography/Typography';

interface LoadingProps {
  label?: string;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({ label, size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} />
      <Typography>{label}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
