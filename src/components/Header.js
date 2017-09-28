import { array, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { SHAPE, STYLE } from '../config';
import Button from './Button';
import styles from './Header.style';

const Header = ({ children, navigation, style, title }) => (
  <View style={[STYLE.ROW, styles.header, style]}>
    { navigation &&
      <Button
        icon="arrowBack"
        onPress={() => navigation.goBack(null)}
        raised
        style={styles.button}
      /> }
    <View style={styles.main}>
      { title && <Text style={styles.title}>{title}</Text> }
      { children }
    </View>
    { navigation &&
      <Button icon="empty" raised style={styles.button} /> }
  </View>
);

Header.propTypes = {
  navigation: SHAPE.NAVIGATION,
  children: oneOfType(array, node),
  style: oneOfType(array, number),
  title: string,
};

Header.defaultProps = {
  navigation: undefined,
  children: undefined,
  style: [],
  title: undefined,
};

export default Header;
