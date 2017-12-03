import { node, string } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { ASSETS, STYLE, THEME } from '../../../config';
import styles from './Slide.style';

const Slide = ({
  backgroundColor, caption, children, image, hint,
}) => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.slide, { backgroundColor }]}>
    <Motion animation="bounceInDown">
      <Image style={styles.image} source={ASSETS[image]} />
    </Motion>
    <Motion animation="bounceInUp" delay={200}>
      <Text style={styles.caption}>{caption}</Text>
    </Motion>
    <Motion animation="bounceInUp" delay={300}>
      <Text style={styles.hint}>{hint}</Text>
    </Motion>
    <Motion animation="bounceInUp" delay={400}>
      {children}
    </Motion>
  </View>
);

Slide.propTypes = {
  backgroundColor: string,
  caption: string,
  children: node,
  image: string,
  hint: string,
};

Slide.defaultProps = {
  backgroundColor: THEME.COLOR.PRIMARY,
  children: undefined,
  caption: undefined,
  image: undefined,
  hint: undefined,
};

export default Slide;
