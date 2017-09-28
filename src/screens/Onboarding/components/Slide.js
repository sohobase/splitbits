import { node, string } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './Slide.style';

const Slide = ({ backgroundColor, caption, children, image, text }) => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.slide, { backgroundColor }]}>
    <Animatable animation="bounceInDown">
      <Image style={styles.image} source={{ uri: image }} />
    </Animatable>
    <Animatable animation="bounceInUp" delay={200}>
      <Text style={styles.caption}>{caption.toUpperCase()}</Text>
    </Animatable>
    <Animatable animation="bounceInUp" delay={400}>
      <Text style={styles.text}>{text}</Text>
    </Animatable>
    {children}
  </View>
);

Slide.propTypes = {
  backgroundColor: string,
  caption: string,
  children: node,
  image: string,
  text: string,
};

Slide.defaultProps = {
  backgroundColor: THEME.COLOR.PRIMARY,
  children: undefined,
  caption: 'hello world',
  image: undefined,
  text: 'consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default Slide;
