import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';

interface AccordionItemProps {
  title: string;
  expanded?: boolean;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  expanded = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [animation] = useState(new Animated.Value(expanded ? 1 : 0));

  const toggle = () => {
    const initialValue = isExpanded ? 1 : 0;
    const finalValue = isExpanded ? 0 : 1;

    animation.setValue(initialValue);

    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    });

    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle}>
        <View style={styles.titleContainer}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon icon="forward" />
          </Animated.View>
          <Typography variant="title">{title}</Typography>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <Animated.View
          style={[styles.contentContainer, { opacity: animation }]}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contentContainer: {
    marginTop: 8,
  },
});
