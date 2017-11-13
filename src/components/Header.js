import { array, node, number, object, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { SHAPE, STYLE, THEME } from '../config';
import Button from './Button';
import styles from './Header.style';

const { COLOR } = THEME;

const renderButton = (props = {}, animation, tintColor) => (
  <Animatable {...animation}>
    <Button {...props} raised style={styles.button} captionStyle={{ tintColor }} />
  </Animatable>
);

const Header = ({ animation, buttonRight, children, navigation, style, tintColor, title }) => (
  <View style={[STYLE.ROW, styles.header, style]}>
    { navigation &&
      renderButton({ icon: 'arrowBack', onPress: () => navigation.goBack() }, { animation, delay: 200 }, tintColor) }
    <Animatable animation={animation} delay={300} style={styles.content}>
      <View style={STYLE.CENTERED}>
        { title && <Text style={[styles.title, (tintColor && { color: tintColor })]}>{title}</Text> }
        { children }
      </View>
    </Animatable>
    { navigation && renderButton(buttonRight, { animation, delay: 400 }, tintColor) }
  </View>
);

Header.propTypes = {
  animation: string,
  buttonRight: SHAPE.BUTTON,
  children: oneOfType([array, node]),
  navigation: SHAPE.NAVIGATION,
  style: oneOfType([array, number]),
  tintColor: oneOfType([string, object]),
  title: string,
};

Header.defaultProps = {
  animation: 'bounceInDown',
  buttonRight: undefined,
  navigation: undefined,
  children: undefined,
  style: [],
  tintColor: COLOR.WHITE,
  title: undefined,
};

export default Header;
