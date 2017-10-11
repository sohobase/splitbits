import { func, string } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import { DevicesList } from '../../../containers';
import styles from './Recipient.style';

class Recipient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.device.devices,
      query: undefined,
    };
    this._onCamera = this._onCamera.bind(this);
    this._onQuery = this._onQuery.bind(this);
  }

  _onCamera() {
    console.log('_onCamera', this.props);
  }

  _onQuery(query) {
    const { device: { devices = [] }, selected } = this.props;

    this.setState({
      data: devices.filter(({ id, name = '' }) => id === selected || name.toLowerCase().includes(query.toLowerCase())),
      query,
    });
  }

  render() {
    const { _onCamera, _onQuery, props: { onItem, selected }, state: { data, query } } = this;

    return (
      <View>
        <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
          <TextInput
            onChangeText={_onQuery}
            placeholder="Search or read a QR..."
            style={styles.input}
            value={query}
          />
          <Icon value="camera" onPress={_onCamera} style={styles.icon} />
        </View>
        <DevicesList data={data} onItem={onItem} selected={selected} />
      </View>
    );
  }
}

Recipient.propTypes = {
  device: SHAPE.DEVICE,
  onAddress: func,
  onItem: func,
  selected: string,
};

Recipient.defaultProps = {
  device: {},
  onAddress() {},
  onItem() {},
  selected: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Recipient);
