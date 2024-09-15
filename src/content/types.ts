import type { TypographyVariant } from '../components/Typography/Typography';

export interface TextContent {
  kind: 'text';
  text: string;
  variant?: TypographyVariant;
  bold?: boolean;
  selectable?: boolean;
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
  selectable?: boolean;
}

export interface SectionContent {
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

export interface BoxContent {
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

export type ChildrenContent = Content[];

export interface ListContent {
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
