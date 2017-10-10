import React, { Component } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { Header } from '../../components';
import { QRreader } from './components';
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
    await DeviceService.request({ id, direct: true });
    this.props.navigation.goBack();
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
};

Friends.defaultProps = {
  navigation: undefined,
};

export default Friends;
