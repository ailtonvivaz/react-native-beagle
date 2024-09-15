import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { useThemedStyles, type BaseTheme } from '../../contexts/ThemeContext';

export type TypographyVariant =
  | 'title'
  | 'body'
  | 'caption'
  | 'headline'
  | 'code';

interface TypographyProps
  extends Omit<TextProps, 'selectable' | 'selectionColor'> {
  variant?: TypographyVariant;
  bold?: boolean;
  children: React.ReactNode;
  selectable?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  bold,
  selectable,
  children,
  style,
  ...props
}) => {
  const styles = useThemedStyles(themedStyles);
  const variantTextStyle = styles[variant];

  const textStyle: StyleProp<TextStyle> = [
    variantTextStyle,
    bold === true ? styles.bold : bold === false ? styles.normal : undefined,
    style,
  ];

  if (selectable && Platform.OS === 'ios') {
    return (
      <TextInput
        multiline
        editable={false}
        style={textStyle}
        {...props}
        scrollEnabled={false}
      >
        {children}
      </TextInput>
    );
  }

  return (
    <Text style={textStyle} {...props} selectable={selectable}>
      {children}
    </Text>
  );
};

const themedStyles = (theme: BaseTheme) =>
  StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    bold: {
      fontWeight: 'bold',
    },
    normal: {
      fontWeight: 'normal',
    },
    body: {
      fontSize: 16,
      color: theme.colors.primary,
    },
    caption: {
      fontSize: 14,
      color: theme.colors.secondary,
    },
    headline: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    code: {
      fontFamily: theme.fonts.mono,
      fontSize: 14,
    },
  });
