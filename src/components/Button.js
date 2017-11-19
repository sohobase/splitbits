import { array, bool, func, node, number, object, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import Icon from './Icon';
import Touchable from './Touchable';
import { STYLE } from '../config';
import styles from './Button.style';

const Button = ({
  accent, caption, captionStyle, children, circle, disabled, icon, onPress, raised, style, motion,
}) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <Motion
      {...motion}
      style={StyleSheet.flatten([
        styles.container,
        STYLE.CENTERED,
        (circle && styles.circle),
        (!circle && !raised && styles.square),
        (disabled && styles.disabled),
        (!disabled && accent && styles.accent),
        style,
      ])}
    >
      { icon &&
        <Icon value={icon} style={[styles.icon, captionStyle]} /> }
      { caption &&
        <Text style={[styles.caption, captionStyle]}>{caption.replace(/\b\w/g, l => l.toUpperCase())}</Text> }
      { !icon && !caption && children }
    </Motion>
  </Touchable>
);

Button.propTypes = {
  accent: bool,
  caption: string,
  captionStyle: oneOfType([array, number, object]),
  children: node,
  circle: bool,
  disabled: bool,
  icon: string,
  motion: shape({}),
  onPress: func,
  raised: bool,
  style: oneOfType([array, number]),
};

Button.defaultProps = {
  accent: false,
  caption: undefined,
  captionStyle: [],
  children: undefined,
  circle: false,
  disabled: false,
  icon: undefined,
  motion: {},
  onPress: undefined,
  raised: false,
  style: [],
};

export default Button;
