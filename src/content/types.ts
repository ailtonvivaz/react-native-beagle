import type { TypographyVariant } from '../components/Typography/Typography';

interface KeyedContent {
  key: string;
}

export interface TextContent {
  kind: 'text';
  text: string;
  variant?: TypographyVariant;
  bold?: boolean;
  selectable?: boolean;
  lines?: number;
}

export interface JsonContent {
  kind: 'json';
  data: Record<string, any>;
  expanded?: boolean;
}

export interface LabelContent {
  kind: 'label';
  label: string;
  value: string;
}

export interface SectionContent extends KeyedContent {
  kind: 'section';
  title: string;
  expanded?: boolean;
  children: Content[];
}

export interface LoadingContent {
  kind: 'loading';
  label?: string;
  size?: number;
}

export interface BoxContent extends KeyedContent {
  kind: 'box';
  direction?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  children: Content[];
}

export type Content = TextContent | JsonContent | LabelContent | LoadingContent;

export interface ListContent extends KeyedContent {
  kind: 'list';
  children: (Content | SectionContent)[];
}

export interface Tab {
  title: string;
  content: ListContent;
}

export interface TabBarContent {
  kind: 'tab-bar';
  tabs: Tab[];
}

export type DetailContent = ListContent | TabBarContent;
