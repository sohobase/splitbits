import { array, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../config';
import Button from './Button';
import Icon from './Icon';
import styles from './Header.style';

const Header = ({ children, style, title }) => (
  <View style={[STYLE.ROW, styles.container, style]}>
    <View style={styles.main}>
      { title && <Text style={styles.title}>{title}</Text> }
      { children }
    </View>
  </View>
);

Header.propTypes = {
  children: oneOfType(array, node),
  style: oneOfType(array, number),
  title: string,
};

Header.defaultProps = {
  children: undefined,
  style: [],
  title: undefined,
};

export default Header;
