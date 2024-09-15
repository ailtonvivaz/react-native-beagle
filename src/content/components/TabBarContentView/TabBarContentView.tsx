import { StyleSheet, View } from 'react-native';
import { TabBar } from '../../../components/TabBar/TabBar';
import type { TabBarContent } from '../../types';
import { ListContentView } from '../ListContentView/ListContentView';

interface TabBarContentViewProps {
  content: TabBarContent;
}

export const TabBarContentView: React.FC<TabBarContentViewProps> = ({
  content,
}) => {
  return (
    <View style={styles.container}>
      <TabBar
        tabs={content.tabs.map((tab) => ({
          key: tab.title,
          label: tab.title,
          children: (
            <ListContentView content={tab.content} suffixKey={tab.title} />
          ),
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
