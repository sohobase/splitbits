import { string } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../../../config';
import styles from './Slide.style';

const Slide = ({ backgroundColor, image, text, caption }) => (
  <View style={[STYLE.SCREEN, STYLE.CENTERED, styles.slide, { backgroundColor }]}>
    <Animatable>
      <Image style={styles.image} source={{ uri: image }} />
    </Animatable>
    <Animatable>
      <Text style={styles.caption}>{caption.toUpperCase()}</Text>
    </Animatable>
    <Animatable>
      <Text style={styles.text}>{text}</Text>
    </Animatable>
  </View>
);

Slide.propTypes = {
  backgroundColor: string,
  caption: string,
  image: string,
  text: string,
};

Slide.defaultProps = {
  backgroundColor: THEME.COLOR.PRIMARY,
  caption: 'hello world',
  image: undefined,
  text: 'consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default Slide;
