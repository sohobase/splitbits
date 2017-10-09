import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Header } from '../../components';
import { ScanQR } from './components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DevicesList } from '../../containers';
import { DeviceService } from '../../services';
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
    this._onScanQR = this._onScanQR.bind(this);
  }

  _onCamera() {
    this.setState(({ scanner }) => ({ scanner: !scanner }));
  }

  async _onQuery(query) {
    this.setState({ refreshing: true, query });
    this.setState({
      data: await DeviceService.search(query),
      refreshing: false,
    });
  }

  async _onScanQR(data) { // eslint-disable-line
    console.log('data', data);
  }

  render() {
    const { _onCamera, _onQuery, _onScanQR, props: { navigation }, state: { query, scanner, ...state } } = this;

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
        <ScanQR active={scanner} onClose={_onCamera} onScan={_onScanQR} />
      </View>
    );
  }
}

Friends.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Friends.defaultProps = {
  navigation: undefined,
};

export default Friends;
