import React, { useCallback } from 'react';
import type { Content } from '../../types';
import { JsonContentView } from '../JsonContentView/JsonContentView';
import { LabelContentView } from '../LabelContentView/LabelContentView';
import { LoadingContentView } from '../LoadingContentView/LoadingContentView';
import { TextContentView } from '../TextContentView/TextContentView';

interface ContentViewProps {
  content: Content;
}

export const ContentView: React.FC<ContentViewProps> = ({ content }) => {
  const renderContentView = useCallback(() => {
    switch (content.kind) {
      case 'text':
        return <TextContentView content={content} />;
      case 'json':
        return <JsonContentView content={content} />;
      case 'label':
        return <LabelContentView content={content} />;
      case 'loading':
        return <LoadingContentView content={content} />;
    }
  }, [content]);

  return renderContentView();
};
