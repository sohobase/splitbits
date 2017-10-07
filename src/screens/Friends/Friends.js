import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Header } from '../../components';
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
    };
    this._onCamera = this._onCamera.bind(this);
    this._onQuery = this._onQuery.bind(this);
  }

  _onCamera() {

  }

  async _onQuery(query) {
    this.setState({ refreshing: true, query });
    this.setState({
      data: await DeviceService.search(query),
      refreshing: false,
    });
  }

  render() {
    const { _onCamera, _onQuery, props: { navigation }, state: { query, ...state } } = this;

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
