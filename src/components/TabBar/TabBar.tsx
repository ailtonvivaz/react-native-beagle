import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemedStyles, type BaseTheme } from '../../contexts/ThemeContext';

interface Tab {
  key: string;
  label: string;
  children: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
}

export const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const styles = useThemedStyles(themedStyles);
  const [activeTab, setActiveTab] = useState<string | undefined>();

  useEffect(() => {
    if (!activeTab && tabs.length) {
      setActiveTab(tabs[0]?.key);
    }
  }, [activeTab, tabs]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {tabs.find((tab) => tab.key === activeTab)?.children}
      </View>
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.header,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      flex: 1,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderColor: theme.colors.accent,
    },
    tabText: {
      color: theme.colors.secondary,
      textAlign: 'center',
    },
    activeTabText: {
      color: theme.colors.accent,
    },
    content: {
      flex: 1,
    },
  });
