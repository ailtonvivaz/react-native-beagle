import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  useThemedStyles,
  type BaseTheme,
} from '../../../../contexts/ThemeContext';
import { isArray } from '../../../../utils/isArray';
import { isObject } from '../../../../utils/isObject';
import { Typography } from '../../../Typography/Typography';

const TAB_SIZE = 2;
const TAB = ' '.repeat(TAB_SIZE);
const tab = (level: number) =>
  Array.from({ length: level }, () => TAB).join('');

interface JsonNodeProps {
  keyName: string;
  value: any;
  level: number;
  expanded: boolean;
  onToggle: () => void;
}

export const JsonNode: React.FC<JsonNodeProps> = React.memo(
  ({ keyName, value, level, expanded, onToggle }) => {
    const styles = useThemedStyles(themedStyles);

    const isExpandable = isObject(value) || isArray(value);

    const renderValue = () => {
      if (isExpandable) {
        return (
          <Typography variant="code" style={styles.type}>
            {isArray(value) ? `Array(${value.length})` : 'Object'}
          </Typography>
        );
      }
      return (
        <Typography variant="code" style={styles.value} numberOfLines={1}>
          {JSON.stringify(value)}
        </Typography>
      );
    };

    if (isExpandable) {
      return (
        <TouchableOpacity onPress={onToggle} style={styles.nodePressable}>
          <Typography variant="code" style={styles.key} numberOfLines={1}>
            {tab(level)}
            {expanded ? '▼' : '▶'} {keyName}: {renderValue()}
          </Typography>
        </TouchableOpacity>
      );
    }

    return (
      <Typography
        variant="code"
        style={styles.key}
        numberOfLines={1}
        selectable
      >
        {tab(level)}
        {'  '}
        {keyName}: {renderValue()}
      </Typography>
    );
  }
);

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    nodePressable: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    key: {
      color: theme.colors.json.key,
    },
    value: {
      color: theme.colors.json.value,
    },
    type: {
      color: theme.colors.json.type,
    },
  });
