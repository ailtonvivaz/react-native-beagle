import { SafeAreaView, StyleSheet, View } from 'react-native';
import type { BaseTheme } from '../../contexts/ThemeContext';
import { useThemedStyles } from '../../contexts/ThemeContext';

interface BottomBarProps {
  justifyContent?: 'space-between' | 'space-around' | 'space-evenly';
  children: React.ReactNode;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  children,
  justifyContent = 'space-between',
}) => {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.bottomBar}>
      <SafeAreaView>
        <View style={[styles.container, { justifyContent }]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    bottomBar: {
      backgroundColor: theme.colors.header,
      padding: 16,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
