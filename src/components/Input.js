import { array, bool, number, oneOfType } from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native';
import { THEME } from '../config';
import styles from './Input.style';

const { COLOR } = THEME;

const Input = ({ highlight, style, ...inherit }) => (
  <TextInput
    {...inherit}
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="transparent"
    placeholderTextColor={highlight ? COLOR.PLACEHOLDER_HIGHLIGHT : undefined}
    style={[
      styles.input,
      (highlight ? styles.highlight : undefined),
      (!inherit.editable && styles.disabled),
      style,
    ]}
  />
);

Input.propTypes = {
  highlight: bool,
  style: oneOfType([array, number]),
};

Input.defaultProps = {
  highlight: false,
  style: [],
};

export default Input;
