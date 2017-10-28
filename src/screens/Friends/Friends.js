import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Keyboard, TextInput, View } from 'react-native';
import { Header, QRreader } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DevicesList } from '../../containers';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './Friends.style';

const { COLOR } = THEME;

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: undefined,
      refreshing: false,
      scanner: false,
    };
    this._onCamera = this._onCamera.bind(this);
    this._onQuery = this._onQuery.bind(this);
    this._onQRreader = this._onQRreader.bind(this);
  }

  _onCamera() {
    Keyboard.dismiss();
    this.setState(({ scanner }) => ({ scanner: !scanner }));
  }

  async _onQuery(query) {
    this.setState({ refreshing: true, query });
    this.setState({
      data: await DeviceService.search(query),
      refreshing: false,
    });
  }

  async _onQRreader(id) {
    const { navigation, updateDevice } = this.props;
    updateDevice(await DeviceService.request({ id, direct: true }));
    navigation.goBack();
  }

  render() {
    const { _onCamera, _onQuery, _onQRreader, props: { navigation }, state: { query, scanner, ...state } } = this;

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header
          buttonRight={{ icon: 'camera', onPress: _onCamera }}
          navigation={navigation}
          style={STYLE.HEADER_HIGHLIGHT}
          tintColor={COLOR.TEXT_DEFAULT}
        >
          <TextInput
            autoFocus
            onChangeText={_onQuery}
            placeholder="Search friends..."
            style={[STYLE.INPUT, styles.input]}
            value={query}
          />
        </Header>
        <DevicesList navigation={navigation} request {...state} />
        <QRreader active={scanner} onClose={_onCamera} onRead={_onQRreader} />
      </View>
    );
  }
}

Friends.propTypes = {
  navigation: SHAPE.NAVIGATION,
  updateDevice: func.isRequired,
};

Friends.defaultProps = {
  navigation: undefined,
};

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(undefined, mapDispatchToProps)(Friends);
