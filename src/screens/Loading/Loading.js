import React from 'react';
import { View, StyleSheet } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE } from '../../config';
import { Logo } from '../../components';
import styles from './Loading.style';

export default () => (
  <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
    <Animatable animation="bounceIn" duration={1000}>
      <Logo />
    </Animatable>
  </View>
);
