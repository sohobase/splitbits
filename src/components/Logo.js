import { array, number, shape, oneOfType } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import styles from './Logo.style';
import { ASSETS } from '../config';

const Logo = ({ motion, style }) => (
  <Motion {...motion}>
    <Image style={[styles.logo, style]} source={ASSETS.brandname} />
  </Motion>
);

Logo.propTypes = {
  motion: shape({}),
  style: oneOfType([array, number]),
};

Logo.defaultProps = {
  motion: {},
  style: [],
};

export default Logo;
