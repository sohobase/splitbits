import Color from 'color';
import Identicon from 'identicon.js';
import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { Button, Icon } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './DeviceItem.style';

const { COLOR: { ACCEPT, CANCEL, WHITE } } = THEME;

const BUTTON_ACCEPT = { backgroundColor: ACCEPT, underlayColor: Color(ACCEPT).darken(0.1).string(), type: 'delete' };
const BUTTON_CANCEL = { backgroundColor: CANCEL, underlayColor: Color(CANCEL).darken(0.1).string() };

class DeviceItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.device.name };
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
    const { _onRelation, _onRequest, props: { data: { id, name }, device: { requests }, onPress, request, selected } } = this;
    let { props: { data: { image } } } = this;
    const isRequest = requests.find(item => item.id === id);
    let options;

    if (!selected && (!image || image.length === 0)) {
      const identicon = new Identicon(`${id}${new Date().toString()}`, {
        background: [255, 255, 255, 255],
        margin: 0,
        size: 256,
      }).toString();
      image = `data:image/png;base64,${identicon}`;
    }

    if (!request && !onPress) {
      options = (!isRequest)
        ? [{ ...BUTTON_CANCEL, text: 'Remove', onPress: () => _onRelation('remove') }]
        : [
          { ...BUTTON_ACCEPT, text: 'Accept', onPress: () => _onRelation('accept') },
          { ...BUTTON_CANCEL, text: 'Cancel', onPress: () => _onRelation('cancel') },
        ];
    }

    return (
      <Swipeout right={options} backgroundColor={WHITE} >
        <TouchableWithoutFeedback onPress={() => onPress(id)}>
          <View style={[STYLE.ROW, STYLE.LIST_ITEM, (selected && styles.selected)]}>
            {
              selected
                ? <View style={[STYLE.CENTERED, styles.avatar, styles.avatarSelected]}><Icon value="check" style={styles.icon}/></View>
                : <Image style={[styles.avatar, styles.image]} source={{ uri: image }} />
            }
            <View style={styles.content}>
              <Text style={[styles.name, (!name && styles.private)]}>{name || 'Private Name'}</Text>
              { !request && isRequest && <Text style={styles.hint}>Request friendship, swipe right...</Text> }
            </View>
            { request &&
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
  data: SHAPE.DEVICE,
  device: SHAPE.DEVICE,
  onPress: func,
  onRequest: func,
  request: bool,
  selected: bool,
  updateDevice: func,
};

DeviceItem.defaultProps = {
  data: {},
  device: {},
  onPress() {},
  onRequest() {},
  request: false,
  selected: false,
  updateDevice() {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceItem);
