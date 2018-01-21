import { array, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { C } from '../config';
import Icon from './Icon';
import styles from './Avatar.style';

const { SERVICE } = C;

const Avatar = ({ value, selected, style }) => (
  <View style={[styles.container, styles.avatar, (selected && styles.selected), style]}>
    { value
      ?
        <Image
          style={[styles.avatar, styles.image]}
          source={{ uri: `${SERVICE}public/${value}?timestamp=${new Date().getTime().toString().substr(0, 8)}` }}
        />
      :
        <Icon value="face" style={[styles.avatar, styles.icon]} /> }
  </View>
);

Avatar.propTypes = {
  value: string,
  selected: bool,
  style: oneOfType([array, number]),
};

Avatar.defaultProps = {
  value: undefined,
  selected: false,
  style: [],
};

export default Avatar;
