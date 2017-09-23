import React, { Component } from 'react';
import { FlatList, Text, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, ButtonIcon } from '../../components';
import { STYLE } from '../../config';
import { ActivityItem, WalletItem } from './components';
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
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: '$ 0.000,00',
      // headerRight: <ButtonIcon icon="add" onPress={() => navigate('Currencies')} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      prefetch: false,
      refreshing: false,
    };
    this._renderActivity = this._renderActivity.bind(this);
  }

  _renderActivity({ item }) {
    const { refreshing } = this.state;

    return (
      <ActivityItem data={item} />
    );
  }

  render() {
    const { refreshing, prefetch } = this.state;

    return (
      <View style={[STYLE.SCREEN, styles.main]}>
        <View style={[STYLE.LAYOUT_TOP]}>
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
          <Text>Profile</Text>
          <Button caption="?" icon="add" accent circle style={styles.action} />
          <Text>Settings</Text>
        </View>

      </View>
    );
  }
}

export default Main;
