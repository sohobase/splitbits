import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import styles from './DeviceItem.style';

const DeviceItem = ({ data: { image, name } }) => (
  <View style={[STYLE.ROW, styles.container]}>
    <Image style={styles.image} source={{ uri: image }} />
    <Text style={[styles.name, (!name && styles.private)]}>{name || 'Private Name'}</Text>
  </View>
);

DeviceItem.propTypes = {
  data: SHAPE.DEVICE,
};

DeviceItem.defaultProps = {
  data: {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DeviceItem);
