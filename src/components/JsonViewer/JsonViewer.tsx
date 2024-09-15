import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import { useThemedStyles, type BaseTheme } from '../../contexts/ThemeContext';
import { isArray } from '../../utils/isArray';
import { isObject } from '../../utils/isObject';
import { CopyButton } from '../CopyButton/CopyButton';
import { Typography } from '../Typography/Typography';
import { JsonNode } from './components/JsonNode/JsonNode';

interface FlattenedNode {
  key: string;
  value: any;
  level: number;
  path: string;
  isExpandable: boolean;
}

interface JsonViewerProps {
  data: Record<string, any> | null;
  expanded?: boolean;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  expanded = false,
}) => {
  const styles = useThemedStyles(themedStyles);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const isDataPrimitive = useMemo(() => {
    return !isObject(data) && !isArray(data);
  }, [data]);

  const flattenJson = useCallback(
    (obj: any, level = 0, parentPath = ''): FlattenedNode[] => {
      let result: FlattenedNode[] = [];
      Object.keys(obj).forEach((key) => {
        const path = parentPath ? `${parentPath}.${key}` : key;
        const isExpandable = isObject(obj[key]) || isArray(obj[key]);
        result.push({ key, value: obj[key], level, path, isExpandable });
        if (isExpandable && expandedNodes.has(path)) {
          result = result.concat(flattenJson(obj[key], level + 1, path));
        }
      });
      return result;
    },
    [expandedNodes]
  );

  const flattenedData = useMemo(() => {
    if (isDataPrimitive) return [];
    return flattenJson(data);
  }, [data, flattenJson, isDataPrimitive]);

  const toggleNode = useCallback((path: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  const expandAllNodes = useCallback((obj: any, parentPath = ''): string[] => {
    let paths: string[] = [];
    Object.keys(obj).forEach((key) => {
      const path = parentPath ? `${parentPath}.${key}` : key;
      if (isObject(obj[key]) || isArray(obj[key])) {
        paths.push(path);
        paths = paths.concat(expandAllNodes(obj[key], path));
      }
    });
    return paths;
  }, []);

  const expandAll = useCallback(() => {
    const allPaths = expandAllNodes(data);
    setExpandedNodes(new Set(allPaths));
  }, [data, expandAllNodes]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  useEffect(() => {
    if (expanded && !isDataPrimitive) {
      expandAll();
    }
  }, [expanded, expandAll, isDataPrimitive]);

  const toggleAll = useCallback(() => {
    if (expandedNodes.size === 0) {
      expandAll();
    } else {
      collapseAll();
    }
  }, [expandedNodes, expandAll, collapseAll]);

  const renderItem = useCallback(
    ({ item }: { item: FlattenedNode }) => (
      <JsonNode
        keyName={item.key}
        value={item.value}
        level={item.level}
        expanded={expandedNodes.has(item.path)}
        onToggle={() => toggleNode(item.path)}
      />
    ),
    [expandedNodes, toggleNode]
  );

  return (
    <View style={styles.all}>
      <View style={styles.header}>
        <Pressable onPress={toggleAll}>
          <Typography variant="caption">
            {expandedNodes.size === 0 ? 'Expand All' : 'Collapse All'}
          </Typography>
        </Pressable>
        <CopyButton text={() => JSON.stringify(data, null, 2)} />
      </View>
      <ScrollView horizontal style={styles.scroll}>
        {isDataPrimitive ? (
          <Typography variant="code" style={styles.value}>
            {JSON.stringify(data)}
          </Typography>
        ) : (
          <VirtualizedList
            data={flattenedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.path}
            getItemCount={() => flattenedData.length}
            getItem={(items, index) => items[index]}
            initialNumToRender={30}
            maxToRenderPerBatch={30}
            windowSize={5}
            style={styles.list}
          />
        )}
      </ScrollView>
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    all: {
      borderRadius: 8,
      overflow: 'hidden',
      flex: 1,
    },
    scroll: {
      backgroundColor: theme.colors.card.background,
      flex: 1,
      padding: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: theme.colors.card.header,
    },
    list: {
      gap: 4,
    },
    value: {
      color: theme.colors.json.value,
    },
  });
