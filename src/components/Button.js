import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from './Touchable';
import styles from './Button.style';

const Button = ({ accent, caption, captionStyle, disabled, onPress, style }) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <View
      style={StyleSheet.flatten([
        styles.container,
        style,
        (disabled ? styles.disabled : undefined),
        (accent ? styles.accent : undefined),
      ])}
    >
      <Text style={[styles.caption, captionStyle]}>{caption}</Text>
    </View>
  </Touchable>
);

Button.propTypes = {
  accent: bool,
  caption: string,
  captionStyle: oneOfType(array, number),
  disabled: bool,
  onPress: func,
  style: oneOfType(array, number),
};

Button.defaultProps = {
  accent: false,
  caption: undefined,
  captionStyle: [],
  disabled: false,
  onPress: undefined,
  style: [],
};

export default Button;
