import Color from 'color';
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
    const { _onAccept, _onCancel, props: { data: { id, image, name }, device: { requests } } } = this;
    const isRequest = requests.find(item => item.id === id);

    return (
      <Swipeout
        right={
          (!isRequest)
            ? [{ ...BUTTON_CANCEL, text: 'Remove' }]
            : [
              { ...BUTTON_ACCEPT, text: 'Accept', onPress: _onAccept },
              { ...BUTTON_CANCEL, text: 'Cancel', onPress: _onCancel },
            ]
        }
        backgroundColor={WHITE}
      >
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
};

DeviceItem.defaultProps = {
  data: {},
  device: {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(DeviceItem);
