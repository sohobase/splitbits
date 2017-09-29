import { array, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { SHAPE, STYLE } from '../config';
import Button from './Button';
import styles from './Header.style';

const renderButton = (props, animation) => (
  <Animatable {...animation}>
    <Button {...props} raised style={styles.button} />
  </Animatable>
);

const Header = ({ animation, buttonRight = {}, children, navigation, style, title }) => (
  <View style={[STYLE.ROW, styles.header, style]}>
    { navigation && renderButton({ icon: 'arrowBack', onPress: () => navigation.goBack() }, { animation, delay: 200 }) }
    <Animatable animation={animation} delay={300} style={styles.content}>
      <View style={STYLE.CENTERED}>
        { title && <Text style={styles.title}>{title}</Text> }
        { children }
      </View>
    </Animatable>
    { (navigation || buttonRight.icon) && renderButton(buttonRight, { animation, delay: 400 }) }
  </View>
);

Header.propTypes = {
  animation: string,
  buttonRight: SHAPE.BUTTON,
  children: oneOfType(array, node),
  navigation: SHAPE.NAVIGATION,
  style: oneOfType(array, number),
  title: string,
};

Header.defaultProps = {
  animation: 'bounceInDown',
  buttonRight: undefined,
  navigation: undefined,
  children: undefined,
  style: [],
  title: undefined,
};

export default Header;
