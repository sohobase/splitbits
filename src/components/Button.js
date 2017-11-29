import { array, bool, func, node, number, object, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import Icon from './Icon';
import Touchable from './Touchable';
import { STYLE, TEXT, THEME } from '../config';
import styles from './Button.style';

const { EN: { WAIT_A_MOMENT } } = TEXT;

const Button = ({
  accent, caption, captionStyle, children, circle, disabled, icon, onPress, processing, raised, style, motion,
}) => (
  <Touchable
    onPress={!disabled && !processing ? onPress : undefined}
    raised={raised}
    style={!raised && { borderRadius: THEME.BUTTON_CIRCLE_SIZE / 2 }}
  >
    <Motion
      {...motion}
      style={StyleSheet.flatten([
        styles.container,
        STYLE.CENTERED,
        (circle && styles.circle),
        (!circle && !raised && styles.square),
        (!disabled && !processing && !raised && !accent && styles.primary),
        (!disabled && !processing && !raised && accent && styles.accent),
        (raised && styles.raised),
        ((disabled || processing) && !raised && styles.disabled),
        (disabled && raised && styles.disabledOpacity),
        style,
      ])}
    >
      { icon &&
        <Icon value={icon} style={[styles.icon, captionStyle]} /> }
      { caption && !processing &&
        <Text style={[styles.caption, captionStyle]}>{caption.replace(/\b\w/g, l => l.toUpperCase())}</Text> }
      { processing &&
        <Motion animation="flash" iterationCount="infinite">
          <Text style={[styles.caption, styles.captionProcessing, captionStyle]}>{WAIT_A_MOMENT}</Text>
        </Motion> }
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
