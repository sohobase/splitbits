import { LinearGradient } from 'expo';
import { array, bool, func, node, number, object, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import Icon from './Icon';
import Touchable from './Touchable';
import { SHAPE, STYLE, THEME } from '../config';
import styles from './Button.style';

const Button = ({
  caption, captionStyle, children, circle, disabled, i18n, icon, onPress, processing, raised, style, motion,
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
        (raised && styles.raised),
        ((disabled || processing) && !raised && styles.disabled),
        (disabled && raised && styles.disabledOpacity),
        style,
      ])}
    >
      { !disabled && !processing && !raised &&
        <LinearGradient
          colors={[THEME.COLOR.ACCENT_DARKEN, THEME.COLOR.ACCENT]}
          start={[0, 0]}
          end={[1, 0]}
          style={StyleSheet.flatten([
            styles.gradient,
            circle ? styles.circle : styles.square,
          ])}
        />}
      { icon &&
        <Icon value={icon} style={[styles.icon, captionStyle]} /> }
      { caption && !processing && <Text style={[styles.caption, captionStyle]}>{caption}</Text> }
      { processing &&
        <Motion animation="flash" iterationCount="infinite">
          <Text style={[styles.caption, styles.captionProcessing, captionStyle]}>{i18n.WAIT_A_MOMENT}</Text>
        </Motion> }
      { !icon && !caption && children }
    </Motion>
  </Touchable>
);

Button.propTypes = {
  caption: string,
  captionStyle: oneOfType([array, number, object]),
  children: node,
  circle: bool,
  disabled: bool,
  i18n: shape(SHAPE.I18N).isRequired,
  icon: string,
  motion: shape({}),
  processing: bool,
  onPress: func,
  raised: bool,
  style: oneOfType([array, number]),
};

Button.defaultProps = {
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

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

export default connect(mapStateToProps)(Button);
