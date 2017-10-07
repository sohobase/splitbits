import Color from 'color';
import Identicon from 'identicon.js';
import { bool } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import styles from './DeviceItem.style';

const { COLOR: { ACCEPT, CANCEL, WHITE } } = THEME;

const BUTTON_ACCEPT = { backgroundColor: ACCEPT, underlayColor: Color(ACCEPT).darken(0.1).string(), type: 'delete' };
const BUTTON_CANCEL = { backgroundColor: CANCEL, underlayColor: Color(CANCEL).darken(0.1).string() };

class DeviceItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.device.name };
    this._onAccept = this._onAccept.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  _onAccept() {
    DeviceService.accept({ id: this.props.data.id });
  }

  _onCancel() {
    DeviceService.cancel({ id: this.props.data.id });
  }

  render() {
    const { _onAccept, _onCancel, props: { data: { id, name }, device: { requests }, request } } = this;
    let { props: { data: { image } } } = this;
    const isRequest = requests.find(item => item.id === id);
    let options;

    if (!image || image.length === 0) {
      const identicon = new Identicon(`${id}${this.props.device.id}`, {
        background: [255, 255, 255, 255],
        margin: 0,
        size: 256,
      }).toString();
      image = `data:image/png;base64,${identicon}`;
    }

    if (!request) {
      options = (!isRequest)
        ? [{ ...BUTTON_CANCEL, text: 'Remove' }]
        : [
          { ...BUTTON_ACCEPT, text: 'Accept', onPress: _onAccept },
          { ...BUTTON_CANCEL, text: 'Cancel', onPress: _onCancel },
        ];
    }

    return (
      <Swipeout right={options} backgroundColor={WHITE} >
        <View style={[STYLE.ROW, styles.container]}>
          <Image style={styles.image} source={{ uri: image }} />
          <View>
            <Text style={[styles.name, (!name && styles.private)]}>{name || 'Private Name'}</Text>
            { isRequest && <Text style={styles.hint}>Request friendship, swipe right...</Text> }
          </View>
        </View>
      </Swipeout>
    );
  }
}

DeviceItem.propTypes = {
  data: SHAPE.DEVICE,
  device: SHAPE.DEVICE,
  request: bool,
};

DeviceItem.defaultProps = {
  data: {},
  device: {},
  request: false,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DeviceItem);
