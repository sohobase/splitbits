import React, { Component } from 'react';
import { FlatList, RefreshControl, TextInput, View } from 'react-native';
import { Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
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

  _onQuery(query) {
    this.setState({ query });
    DeviceService
  }

  render() {
    const { _onCamera, _onQuery, props: { navigation }, state: { data, query, refreshing } } = this;

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header
          tintColor={COLOR.TEXT_DEFAULT}
          navigation={navigation}
          buttonRight={{ icon: 'camera', onPress: _onCamera }}
        >
          <TextInput
            autoFocus
            onChangeText={_onQuery}
            placeholder="Search friends..."
            style={[STYLE.INPUT, styles.input]}
            value={query}
          />
        </Header>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} />}
          renderItem={this._renderTransaction}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />
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
