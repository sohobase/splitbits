import { array, number, oneOfType } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import styles from './Logo.style';

const asset = require('../../assets/app-brandname.png');

const Logo = ({ style }) => <Image style={[styles.logo, style]} source={asset} />;

Logo.propTypes = {
  style: oneOfType([array, number]),
};

Logo.defaultProps = {
  style: [],
};

export default Logo;
