import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import Icon from './Icon';
import Touchable from './Touchable';
import { STYLE } from '../config';
import styles from './Button.style';

const Button = ({ accent, animation, caption, captionStyle, circle, disabled, icon, onPress, style }) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <Animatable
      animation={animation}
      style={StyleSheet.flatten([
        styles.container,
        style,
        (circle ? styles.circle : styles.square),
        (circle ? STYLE.CENTERED : undefined),
        (disabled ? styles.disabled : undefined),
        (accent ? styles.accent : undefined),
      ])}
    >
      { icon &&
        <Icon value={icon} style={[styles.icon]} /> }
      { caption &&
        <Text style={[styles.caption, captionStyle]}>{caption}</Text> }
    </Animatable>
  </Touchable>
);

Button.propTypes = {
  accent: bool,
  animation: string,
  caption: string,
  captionStyle: oneOfType(array, number),
  circle: bool,
  disabled: bool,
  icon: string,
  onPress: func,
  style: oneOfType(array, number),
};

Button.defaultProps = {
  accent: false,
  animation: undefined,
  caption: undefined,
  captionStyle: [],
  circle: false,
  disabled: false,
  icon: undefined,
  onPress: undefined,
  style: [],
};

export default Button;
