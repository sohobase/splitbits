import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button } from '../../components';
import { STYLE } from '../../config';
import { ActivityItem, FooterOption, Header, OperationModal, WalletItem } from './components';
import styles from './MainScreen.style';

const keyExtractor = item => item.symbol;
const ACTIVITIES = [
  {
    id: '0129',
    amount: 10.239,
    createdAt: new Date(),
    wallet: { name: 'mikel', image: 'http://' },
    symbol: 'BTC',
  },
  {
    id: '39s',
    amount: 3.5,
    createdAt: new Date(),
    wallet: { name: 'mikel', image: 'http://' },
    symbol: 'LTC',
  },
];

class Main extends Component {
  // static navigationOptions({ navigation: { navigate } }) {
  //   return {
  //     // header: null,
  //     // title: '$ 0.000,00',
  //     // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      operationModal: false,
      prefetch: false,
      refreshing: false,
    };
    this._onClose = this._onClose.bind(this);
    this._renderActivity = this._renderActivity.bind(this);
  }

  _renderActivity({ item }) {
    const { refreshing } = this.state;

    return (
      <ActivityItem data={item} />
    );
  }

  _onClose() {
    this.setState({ operationModal: !this.state.operationModal });
  }

  render() {
    const { _onClose } = this;
    const { operationModal, refreshing, prefetch } = this.state;

    return (
      <View style={[STYLE.SCREEN, styles.main]}>
        <View style={[STYLE.LAYOUT_TOP]}>
          <Header />
          <Swiper
            bounces
            loop={false}
            showsPagination={false}
            style={styles.wallets}
            _showsHorizontalScrollIndicator
          >
            <WalletItem
              data={{
                name: 'coinbase',
                amount: 10098.23,
                symbol: 'btc',
                qr: 'https://coinbase.com',
              }}
            />

            <WalletItem
              data={{
                name: 'blockchain.org',
                amount: 0.02923,
                symbol: 'btc',
                qr: 'https://sohobase.com',
              }}
            />
          </Swiper>
        </View>

        <FlatList
          data={ACTIVITIES}
          extraData={this.state}
          keyExtractor={(keyExtractor)}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} />}
          renderItem={this._renderActivity}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />

        <View style={[STYLE.ROW, STYLE.CENTERED, styles.footer]}>
          <FooterOption icon="profile" caption="Profile" />
          <Button icon="operations" accent circle onPress={_onClose} style={styles.button} />
          <FooterOption icon="settings" caption="Settings" />
        </View>

        <OperationModal visible={operationModal} onClose={_onClose} />
      </View>
    );
  }
}

export default Main;
