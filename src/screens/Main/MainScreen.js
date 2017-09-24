import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button } from '../../components';
import { STYLE } from '../../config';
import { ActivityService, WalletService } from '../../services';
import { ActivityItem, FooterOption, Header, OperationModal, WalletItem } from './components';
import styles from './MainScreen.style';

const keyExtractor = item => item.id;

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
      activities: undefined,
      wallets: undefined,
      operationModal: false,
      prefetch: false,
      refreshing: false,
    };
    this._onClose = this._onClose.bind(this);
    this._renderActivity = this._renderActivity.bind(this);
  }

  async componentWillMount() {
    this.setState({
      activities: await ActivityService.list(),
      wallets: await WalletService.list(),
    });
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

  _onSwipeWallet(event, state, context) {
    console.log('>>>>', state, context);
  }

  render() {
    const { _onClose, _onSwipeWallet } = this;
    const { activities = [], wallets = [], operationModal, refreshing, prefetch } = this.state;

    return (
      <View style={[STYLE.SCREEN, styles.main]}>
        <View style={[STYLE.LAYOUT_TOP]}>
          <Header />
          <Swiper
            bounces
            loop={false}
            _onTouchStart={_onSwipeWallet}
            _removeClippedSubviews={false}
            showsPagination={false}
            style={styles.wallets}
          >
            { wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} />)}
          </Swiper>
        </View>

        <FlatList
          data={activities}
          extraData={this.state}
          keyExtractor={(keyExtractor)}
          refreshControl={
            <RefreshControl refreshing={refreshing && prefetch} />}
          renderItem={this._renderActivity}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />

        <View style={[STYLE.ROW, STYLE.CENTERED, styles.footer]}>
          <FooterOption icon="profile" caption="Profile" />
          <Button accent animation="bounceIn" circle icon="operations" onPress={_onClose} style={styles.button} />
          <FooterOption icon="settings" caption="Settings" />
        </View>

        <OperationModal visible={operationModal} onClose={_onClose} />
      </View>
    );
  }
}

export default Main;
