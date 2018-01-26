import { array, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { C } from '../config';
import Icon from './Icon';
import styles from './Avatar.style';

const { SERVICE } = C;
const DEFAULT_ICON = 'face';

const Avatar = ({ icon, value, style }) => (
  <View style={[styles.container, styles.avatar, style]}>
    { value
      ?
        <Image
          style={[styles.avatar, styles.image]}
          source={{ uri: `${SERVICE}public/${value}?timestamp=${new Date().getTime().toString().substr(0, 8)}` }}
        />
      :
        <Icon
          value={icon}
          style={[styles.icon, icon === DEFAULT_ICON ? styles.avatar : styles.iconDefault]}
        /> }
  </View>
);

Avatar.propTypes = {
  icon: string,
  value: string,
  style: oneOfType([array, number]),
};

Avatar.defaultProps = {
  icon: DEFAULT_ICON,
  value: undefined,
  style: [],
};

export default Avatar;
