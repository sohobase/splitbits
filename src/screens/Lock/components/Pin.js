import { string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { View as Motion } from 'react-native-animatable';

import { STYLE } from '../../../config';
import styles from './Pin.style';

const Pin = ({ animation, pin }) => (
  <Motion animation={animation} delay={100} style={styles.container}>
    <View style={STYLE.ROW}>
      <View style={[styles.code, (pin.length >= 1 && styles.active)]} />
      <View style={[styles.code, (pin.length >= 2 && styles.active)]} />
      <View style={[styles.code, (pin.length >= 3 && styles.active)]} />
      <View style={[styles.code, (pin.length >= 4 && styles.active)]} />
    </View>
  </Motion>
);

Pin.propTypes = {
  animation: string,
  pin: string,
};

Pin.defaultProps = {
  animation: undefined,
  pin: '',
};

export default Pin;
