import { View } from 'react-native';
import { AccordionItem } from '../../../components/AccordionItem/AccordionItem';
import type { SectionContent } from '../../types';
import { ContentView } from '../ContentView/ContentView';

interface SectionContentViewProps {
  content: SectionContent;
}

export const SectionContentView: React.FC<SectionContentViewProps> = ({
  content: { title, expanded = false, children: content },
}) => {
  return (
    <AccordionItem title={title} expanded={expanded}>
      {content.map((sectionContent, index) => (
        <View key={`${title}_${index}`}>
          <ContentView content={sectionContent} />
        </View>
      ))}
    </AccordionItem>
  );
};
