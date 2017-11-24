import { array, arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE } from '../config';
import { DeviceItem } from './components';
import styles from './DevicesList.style';

const { DEVICE, NAVIGATION } = SHAPE;

const consolidate = (a = [], b = []) => {
  const dataSource = [];
  Array.prototype.push.apply(dataSource, a);
  Array.prototype.push.apply(dataSource, b);
  return dataSource;
};

const DevicesList = ({
  data, device: { devices, requests }, navigation, onItem, onRefresh, refreshing, request, selected, style,
}) => (
  <FlatList
    data={data || consolidate(requests, devices)}
    keyExtractor={item => item.id}
    refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
    renderItem={({ item }) => (
      <DeviceItem
        data={item}
        onPress={onItem}
        onRequest={() => navigation.goBack()}
        request={request}
        selected={item.id === selected}
      />
    )}
    style={[styles.devices, style]}
  />
);

DevicesList.propTypes = {
  data: arrayOf(shape(DEVICE)),
  device: shape(DEVICE).isRequired,
  navigation: shape(NAVIGATION),
  onItem: func,
  onRefresh: func,
  refreshing: bool,
  request: bool,
  selected: string,
  style: oneOfType([array, number]),
};

DevicesList.defaultProps = {
  data: undefined,
  navigation: undefined,
  onItem: undefined,
  onRefresh() {},
  refreshing: false,
  request: false,
  selected: undefined,
  style: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DevicesList);
