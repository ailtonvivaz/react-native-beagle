import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import type { BaseTheme } from '../../contexts/ThemeContext';
import { useTheme, useThemedStyles } from '../../contexts/ThemeContext';

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(themedStyles);

  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={search}
        onChangeText={handleSearch}
        autoCorrect={false}
        returnKeyType="search"
        autoCapitalize="none"
        placeholderTextColor={theme.colors.search.placeholder}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.header,
      padding: 16,
    },
    input: {
      color: theme.colors.search.input,
      backgroundColor: theme.colors.search.background,
      padding: 8,
      borderRadius: 8,
    },
  });
