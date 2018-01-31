import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './Tag.style';

const Tag = ({ style, title }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

Tag.propTypes = {
  style: oneOfType([array, number]),
  title: string,
};

Tag.defaultProps = {
  style: [],
  title: undefined,
};

export default Tag;
