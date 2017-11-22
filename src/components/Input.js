import { array, bool, number, oneOfType } from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native';
import styles from './Input.style';


const Input = ({ highlight, style, ...inherit }) => (
  <TextInput
    {...inherit}
    autoCorrect={false}
    underlineColorAndroid="transparent"
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
