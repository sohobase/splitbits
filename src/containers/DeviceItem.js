import Color from 'color';
import { array, bool, func, number, oneOfType, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import { Avatar, Button } from '../components';
import { SHAPE, STYLE, THEME } from '../config';
import { DeviceService } from '../services';
import { updateDeviceAction } from '../store/actions';
import styles from './DeviceItem.style';

const { COLOR: { GREEN, RED, WHITE } } = THEME;
const BUTTON_ACCEPT = { backgroundColor: GREEN, underlayColor: Color(GREEN).darken(0.1).string(), type: 'delete' };
const BUTTON_CANCEL = { backgroundColor: RED, underlayColor: Color(RED).darken(0.1).string() };

class DeviceItem extends Component {
  constructor(props) {
    super(props);
    this._onRequest = this._onRequest.bind(this);
    this._onRelation = this._onRelation.bind(this);
  }

  _onRelation(method) {
    const { data: { id }, updateDevice } = this.props;
    DeviceService[method]({ id }, updateDevice);
  }

  async _onRequest() {
    const { data: { id }, onRequest } = this.props;
    await DeviceService.request({ id });
    onRequest();
  }

  render() {
    const {
      _onRelation, _onRequest,
      props: {
        i18n, onPress, request, selected, style, data,
        device: { requests },
      },
    } = this;
    const {
      id, image, name, requested,
    } = data;
    const isRequest = requests.find(item => item.id === id);
    let options;

    if (!request && !onPress) {
      options = (!isRequest)
        ? [{ ...BUTTON_CANCEL, text: i18n.REMOVE, onPress: () => _onRelation('remove') }]
        : [
          { ...BUTTON_ACCEPT, text: i18n.ACCEPT, onPress: () => _onRelation('accept') },
          { ...BUTTON_CANCEL, text: i18n.CANCEL, onPress: () => _onRelation('cancel') },
        ];
    }

    return (
      <Swipeout right={options} autoClose backgroundColor={WHITE} >
        <TouchableWithoutFeedback onPress={onPress ? () => onPress(data) : undefined}>
          <View style={[STYLE.ROW, STYLE.LIST_ITEM, (selected && styles.selected), style]}>
            <Avatar selected={selected} value={image} />
            <View style={styles.content}>
              <Text style={[styles.name, (!name && styles.private)]}>{name || i18n.UNKNOWN}</Text>
              { !request && isRequest && <Text style={styles.hint}>{i18n.FRIEND_REQUEST_SWIPE}</Text> }
              { request && requested && <Text style={styles.hint}>{i18n.FRIEND_REQUEST_SENT}</Text> }
            </View>
            { request && !requested &&
              <Button
                accent
                caption={i18n.REQUEST}
                style={styles.button}
                captionStyle={styles.buttonCaption}
                onPress={_onRequest}
              /> }
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    );
  }
}

DeviceItem.propTypes = {
  data: shape(SHAPE.DEVICE),
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onPress: func,
  onRequest: func,
  request: bool,
  selected: bool,
  updateDevice: func,
  style: oneOfType([array, number]),
};

DeviceItem.defaultProps = {
  data: {},
  onPress: undefined,
  onRequest: undefined,
  request: false,
  selected: false,
  updateDevice: undefined,
  style: [],
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceItem);
