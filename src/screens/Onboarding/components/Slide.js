import { node, string } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './Slide.style';

const Slide = ({
  backgroundColor, caption, children, image, text,
}) => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.slide, { backgroundColor }]}>
    <Motion animation="bounceInDown">
      <Image style={styles.image} source={{ uri: image }} />
    </Motion>
    <Motion animation="bounceInUp" delay={200}>
      <Text style={styles.caption}>{caption}</Text>
    </Motion>
    <Motion animation="bounceInUp" delay={300}>
      <Text style={styles.text}>{text}</Text>
    </Motion>
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
