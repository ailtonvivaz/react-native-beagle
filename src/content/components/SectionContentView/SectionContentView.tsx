import { View } from 'react-native';
import { AccordionItem } from '../../../components/AccordionItem/AccordionItem';
import type { SectionContent } from '../../types';
import { ContentView } from '../ContentView/ContentView';

interface SectionContentViewProps {
  content: SectionContent;
}

export const SectionContentView: React.FC<SectionContentViewProps> = ({
  content: { key, title, expanded = false, children: content },
}) => {
  return (
    <AccordionItem title={title} expanded={expanded} key={key}>
      {content.map((sectionContent, index) => (
        <View key={`${key}_${index}`}>
          <ContentView content={sectionContent} />
        </View>
      ))}
    </AccordionItem>
  );
};
