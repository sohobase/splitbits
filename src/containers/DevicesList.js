import { array, number, oneOfType } from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE } from '../config';
import { DeviceItem } from './components';
import styles from './DevicesList.style';

const merge = (a, b) => {
  const dataSource = [];
  Array.prototype.push.apply(dataSource, a);
  Array.prototype.push.apply(dataSource, b);
  return dataSource;
};

const DevicesList = ({ device: { devices, requests }, style }) => (
  <FlatList
    data={merge(requests, devices)}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <DeviceItem data={item} />}
    style={[styles.devices, style]}
  />
);

DevicesList.propTypes = {
  device: SHAPE.DEVICE,
  style: oneOfType(array, number),
};

DevicesList.defaultProps = {
  device: {},
  style: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DevicesList);
