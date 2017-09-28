import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { ICONS } from '../config';
import styles from './Icon.style';

const Icon = ({ value, style }) => <Image style={[styles.icon, style]} source={ICONS[value]} />;

Icon.propTypes = {
  value: string,
  style: oneOfType(array, number),
};

Icon.defaultProps = {
  value: undefined,
  style: [],
};

export default Icon;
