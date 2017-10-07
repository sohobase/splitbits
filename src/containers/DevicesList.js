import { array, arrayOf, bool, number, oneOfType } from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE } from '../config';
import { DeviceItem } from './components';
import styles from './DevicesList.style';

const consolidate = (a = [], b = []) => {
  const dataSource = [];
  Array.prototype.push.apply(dataSource, a);
  Array.prototype.push.apply(dataSource, b);
  return dataSource;
};

const DevicesList = ({ data, device: { devices, requests }, navigation, refreshing, request, style }) => (
  <FlatList
    data={request ? data : consolidate(requests, devices)}
    keyExtractor={item => item.id}
    refreshControl={<RefreshControl refreshing={refreshing} />}
    renderItem={({ item }) => <DeviceItem data={item} onRequest={() => navigation.goBack()} request={request} />}
    style={[styles.devices, style]}
  />
);

DevicesList.propTypes = {
  data: arrayOf(SHAPE.DEVICE),
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
  refreshing: bool,
  request: bool,
  style: oneOfType(array, number),
};

DevicesList.defaultProps = {
  data: undefined,
  device: {},
  navigation: undefined,
  refreshing: false,
  request: false,
  style: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DevicesList);
