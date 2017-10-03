import { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Button } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { WalletModal } from '../../containers';
import { TransactionService } from '../../services';
import { Header, Footer, TransactionModal, TransactionItem, WalletItem } from './components';
import styles from './Main.style';

const { DURATION } = THEME.ANIMATION;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: undefined,
      modal: false,
      prefetch: false,
      refreshing: false,
    };
    this._onModal = this._onModal.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  async componentWillMount() {
    const { wallets = [] } = this.props;
    if (wallets.length > 0) this.setState({ transactions: await TransactionService.list(wallets[0].id) });
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

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  async _onSwipeWallet(event, { index }) {
    const { wallets = [] } = this.props;

    this.setState({ refreshing: true });
    const transactions = await TransactionService.list(wallets[index].id);
    this.setState({ refreshing: false, transactions });
  }

  render() {
    const { _onModal, _onSwipeWallet } = this;
    const { currencies, navigation: { navigate }, wallets } = this.props;
    const { transactions = [], modal, refreshing } = this.state;

    let totalBalance = 0;
    wallets.forEach(({ balance, coin }) => { totalBalance += balance / currencies[coin]; });

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header amount={totalBalance} symbol="USD" trend={-123} />
          <Swiper
            bounces
            loop={false}
            height={206}
            onMomentumScrollEnd={_onSwipeWallet}
            removeClippedSubviews={false}
            showsPagination
            dotStyle={STYLE.SWIPER_DOT}
            activeDotStyle={STYLE.SWIPER_DOT_ACTIVE}
          >
            { wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} />)}
          </Swiper>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} />}
          renderItem={this._renderTransaction}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />
        <Footer navigate={navigate} />
        <Button
          accent
          animation={modal ? 'bounceOutDown' : 'bounceInUp'}
          delay={modal ? 0 : DURATION / 2}
          duration={DURATION}
          circle
          icon="operations"
          onPress={_onModal}
          style={styles.button}
        />
        { 1 === 2 &&
          <TransactionModal visible={modal} onClose={_onModal} onRequest={_onModal} onSend={_onModal} /> }
        <WalletModal visible={modal} onClose={_onModal} />
      </View>
    );
  }
}

Main.propTypes = {
  currencies: SHAPE.CURRENCIES,
  navigation: SHAPE.NAVIGATION,
  wallets: arrayOf(SHAPE.WALLET),
};

Main.defaultProps = {
  currencies: {},
  navigation: undefined,
  wallets: [],
};

const mapStateToProps = ({ currencies, wallets }) => ({
  currencies,
  wallets,
});

export default connect(mapStateToProps)(Main);
