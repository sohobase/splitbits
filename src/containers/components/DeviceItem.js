import Color from 'color';
import { array, bool, func, number, oneOfType, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { Avatar, Button } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './DeviceItem.style';

const { DEVICE } = SHAPE;
const { COLOR: { ACCEPT, CANCEL, WHITE } } = THEME;

const BUTTON_ACCEPT = { backgroundColor: ACCEPT, underlayColor: Color(ACCEPT).darken(0.1).string(), type: 'delete' };
const BUTTON_CANCEL = { backgroundColor: CANCEL, underlayColor: Color(CANCEL).darken(0.1).string() };

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
        data: { id, image, name, requested }, device: { requests }, onPress, request, selected, style,
      },
    } = this;
    const isRequest = requests.find(item => item.id === id);
    let options;

    if (!request && !onPress) {
      options = (!isRequest)
        ? [{ ...BUTTON_CANCEL, text: 'Remove', onPress: () => _onRelation('remove') }]
        : [
          { ...BUTTON_ACCEPT, text: 'Accept', onPress: () => _onRelation('accept') },
          { ...BUTTON_CANCEL, text: 'Cancel', onPress: () => _onRelation('cancel') },
        ];
    }

    return (
      <Swipeout right={options} autoClose backgroundColor={WHITE} >
        <TouchableWithoutFeedback onPress={onPress ? () => onPress(id) : undefined}>
          <View style={[STYLE.ROW, STYLE.LIST_ITEM, (selected && styles.selected), style]}>
            <Avatar selected={selected} value={image} />
            <View style={styles.content}>
              <Text style={[styles.name, (!name && styles.private)]}>{name || 'Private Name'}</Text>
              { !request && isRequest && <Text style={styles.hint}>Request friendship, swipe right...</Text> }
              { request && requested && <Text style={styles.hint}>Friend request sent</Text> }
            </View>
            { request && !requested &&
              <Button
                accent
                caption="Request"
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
  data: shape(DEVICE),
  device: shape(DEVICE),
  onPress: func,
  onRequest: func,
  request: bool,
  selected: bool,
  updateDevice: func,
  style: oneOfType([array, number]),
};

DeviceItem.defaultProps = {
  data: {},
  device: {},
  onPress: undefined,
  onRequest: undefined,
  request: false,
  selected: false,
  updateDevice: undefined,
  style: [],
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceItem);
