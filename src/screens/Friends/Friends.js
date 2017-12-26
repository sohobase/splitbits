import { arrayOf, bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard, View } from 'react-native';
import { Header, Input, QRreader } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DevicesList } from '../../containers';
import { DeviceService } from '../../services';
import { selectDeviceAction, updateDeviceAction } from '../../store/actions';
import styles from './Friends.style';

const { DEVICE, NAVIGATION } = SHAPE;
const { COLOR } = THEME;

class Friends extends Component {
  constructor(props) {
    super(props);
    const { devices = [], selectMode } = props;
    this.state = {
      data: selectMode ? devices : [],
      query: undefined,
      refreshing: false,
      scanner: false,
    };
    this._onCamera = this._onCamera.bind(this);
    this._onItem = this._onItem.bind(this);
    this._onQuery = this._onQuery.bind(this);
    this._onQRreader = this._onQRreader.bind(this);
  }

  _onCamera() {
    Keyboard.dismiss();
    this.setState(({ scanner }) => ({ scanner: !scanner }));
  }

  _onItem(deviceId) {
    const { navigation, selectDevice } = this.props;
    navigation.goBack();
    selectDevice(deviceId);
  }

  async _onQuery(query) {
    const { devices, selectMode } = this.props;

    this.setState({ refreshing: true, query });
    const data = selectMode
      ? devices.filter(({ name = '' }) => name.toLowerCase().includes(query.toLowerCase()))
      : await DeviceService.search(query);

    this.setState({ data, refreshing: false });
  }

  async _onQRreader(id) {
    this.setState({ scanner: false });
    const { navigation, updateDevice } = this.props;
    await DeviceService.qr({ id, direct: true });
    await DeviceService.state().then(updateDevice);
    navigation.goBack();
  }

  render() {
    const {
      _onCamera, _onItem, _onQuery, _onQRreader,
      props: { i18n, navigation, selectMode },
      state: { query, scanner, ...state },
    } = this;
    const headerProps = {
      buttonRight: !selectMode ? { icon: 'camera', onPress: _onCamera } : undefined,
      navigation,
    };

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header {...headerProps} style={STYLE.HEADER_HIGHLIGHT} tintColor={COLOR.TEXT_DEFAULT}>
          <Input
            autoFocus={!selectMode}
            onChangeText={_onQuery}
            placeholder={i18n.SEARCH}
            style={styles.input}
            value={query}
          />
        </Header>
        <DevicesList
          navigation={navigation}
          onRefresh={() => _onQuery(query)}
          request={!selectMode}
          onItem={_onItem}
          {...state}
        />
        { !selectMode && <QRreader active={scanner} onClose={_onCamera} onRead={_onQRreader} /> }
      </View>
    );
  }
}

Friends.propTypes = {
  devices: arrayOf(shape(DEVICE)),
  i18n: shape(SHAPE.DEVICE).isRequired,
  navigation: shape(NAVIGATION).isRequired,
  selectMode: bool,
  selectDevice: func.isRequired,
  updateDevice: func.isRequired,
};

Friends.defaultProps = {
  devices: [],
  selectMode: false,
};

const mapStateToProps = ({ device: { devices = [] }, i18n }, props) => {
  const { selectMode = false } = props.navigation.state.params || {};

  return { devices, i18n, selectMode };
};

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
  selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
