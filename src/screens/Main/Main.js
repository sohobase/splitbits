import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button } from '../../components';
import { SHAPE, STYLE } from '../../config';
import { TransactionService, WalletService } from '../../services';
import { TransactionItem, FooterOption, Header, OperationModal, WalletItem } from './components';
import styles from './Main.style';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: undefined,
      wallets: undefined,
      operationModal: false,
      prefetch: false,
      refreshing: false,
    };
    this._onClose = this._onClose.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  async componentWillMount() {
    this.setState({
      transactions: await TransactionService.list(),
      wallets: await WalletService.list(),
    });
  }

  _renderTransaction({ item }) {
    const { navigation: { navigate } } = this.props;

    return (
      <TransactionItem
        data={item}
        onPress={() => navigate('Transaction', { activity: item })}
      />
    );
  }

  _onClose() {
    this.setState({ operationModal: !this.state.operationModal });
  }

  async _onSwipeWallet(event, { index }) {
    let transactions;

    this.setState({ refreshing: true });
    if (index === 0) transactions = await TransactionService.list();
    this.setState({ refreshing: false, transactions });
  }

  render() {
    const { _onClose, _onSwipeWallet } = this;
    const { navigation: { navigate } } = this.props;
    const { transactions = [], wallets = [], operationModal, refreshing } = this.state;

    return (
      <View style={[STYLE.SCREEN, styles.main]}>
        <View style={[STYLE.LAYOUT_TOP]}>
          <Header />
          <Swiper
            bounces
            loop={false}
            height={206}
            onMomentumScrollEnd={_onSwipeWallet}
            removeClippedSubviews={false}
            showsPagination={false}
            style={styles.wallets}
          >
            { wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} />)}
          </Swiper>
        </View>

        <FlatList
          data={transactions}
          extraData={this.state}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} />}
          renderItem={this._renderTransaction}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />

        <View style={[STYLE.ROW, STYLE.CENTERED, styles.footer]}>
          <FooterOption icon="profile" caption="Profile" onPress={() => navigate('Profile')} />
          <Button accent animation="bounceIn" circle icon="operations" onPress={_onClose} style={styles.button} />
          <FooterOption icon="settings" caption="Settings" onPress={() => navigate('Settings')} />
        </View>

        <OperationModal visible={operationModal} onClose={_onClose} />
      </View>
    );
  }
}

Main.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Main.defaultProps = {
  navigation: undefined,
};

export default Main;
