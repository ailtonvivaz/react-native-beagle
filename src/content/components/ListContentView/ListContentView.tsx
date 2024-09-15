import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import type { Content, ListContent, SectionContent } from '../../types';
import { ContentView } from '../ContentView/ContentView';
import { SectionContentView } from '../SectionContentView/SectionContentView';

interface ListContentViewProps {
  content: ListContent;
  suffixKey?: string;
}

export const ListContentView: React.FC<ListContentViewProps> = ({
  content,
  suffixKey,
}) => {
  const renderItem = (item: Content | SectionContent) => {
    if (item.kind === 'section') {
      return <SectionContentView content={item} />;
    }
    return <ContentView content={item} />;
  };
  return (
    <SafeAreaView>
      <FlatList
        data={content.children}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(_, index) => `${suffixKey ?? 'item'}_${index}`}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16,
  },
});
