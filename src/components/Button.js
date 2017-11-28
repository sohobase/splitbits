import { array, bool, func, node, number, object, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import Icon from './Icon';
import Touchable from './Touchable';
import { STYLE } from '../config';
import styles from './Button.style';

const PROCESSING_ANIMATION = {
  from: { right: 256 },
  to: { right: 0 },
};

const Button = ({
  accent, caption, captionStyle, children, circle, disabled, icon, onPress, processing, raised, style, motion,
}) => (
  <Touchable onPress={!disabled && !processing ? onPress : undefined} raised={raised}>
    <Motion
      {...motion}
      style={StyleSheet.flatten([
        styles.container,
        STYLE.CENTERED,
        (circle && styles.circle),
        (!circle && !raised && styles.square),
        (!disabled && !raised && !accent && styles.primary),
        (!disabled && accent && styles.accent),
        (raised && styles.raised),
        (disabled && !raised && styles.disabled),
        (disabled && raised && styles.disabledOpacity),
        style,
      ])}
    >
      { icon &&
        <Icon value={icon} style={[styles.icon, captionStyle]} /> }
      { caption &&
        <Text style={[styles.caption, captionStyle]}>
          {caption.replace(/\b\w/g, l => l.toUpperCase())}
        </Text> }
      { !icon && !caption && children }
      { processing &&
        <Motion animation={PROCESSING_ANIMATION} duration={5000} iterationCount={6} style={styles.processing} /> }
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
  processing: bool,
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
  processing: false,
  raised: false,
  style: [],
};

export default Button;
