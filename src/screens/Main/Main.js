import { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Button } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { WalletModal } from '../../containers';
import { TransactionService } from '../../services';
import { Header, Footer, TransactionModal, TransactionItem, WalletItem } from './components';
import styles from './Main.style';

const { DURATION } = THEME.ANIMATION;
const { TYPE: { REQUEST, SEND }, VERB: { IMPORT } } = C;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importWallet: false,
      index: undefined,
      modalTransaction: false,
      modalWallet: false,
      refreshing: false,
      transactions: undefined,
    };
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onModalWallet = this._onModalWallet.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  async componentWillMount() {
    const { wallets = [] } = this.props;
    if (wallets.length > 0) this.setState({ transactions: await TransactionService.list(wallets[0].id) });
  }

  _renderTransaction({ item }) {
    const { navigation: { navigate } } = this.props;
    return <TransactionItem data={item} onPress={() => navigate('Transaction', { item })} />;
  }

  _onNewTransaction(type) {
    const {
      props: { navigation: { navigate }, wallets },
      state: { index = 0, modalTransaction },
    } = this;

    this.setState({ modalTransaction: !modalTransaction });
    navigate('Transaction', { type, wallet: wallets[index] });
  }

  _onModal() {
    this.setState({ modalTransaction: !this.state.modalTransaction });
  }

  _onModalWallet(context) {
    this.setState({ importWallet: context === IMPORT, modalWallet: !this.state.modalWallet });
  }

  async _onSwipeWallet(event, { index }) {
    const { wallets = [] } = this.props;
    const wallet = wallets[index];

    this.setState({ index, refreshing: wallet !== undefined, transactions: [] });
    if (wallet) {
      const transactions = await TransactionService.list(wallets[index].id);
      this.setState({ refreshing: false, transactions });
    }
  }

  render() {
    const { _onNewTransaction, _onModal, _onModalWallet, _onSwipeWallet } = this;
    const { navigation: { navigate }, wallets } = this.props;
    const { importWallet, modalTransaction, modalWallet, refreshing, transactions = [] } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header symbol="USD" />
          <Swiper
            bounces
            loop={false}
            onMomentumScrollEnd={_onSwipeWallet}
            removeClippedSubviews={false}
            showsPagination
            dotStyle={STYLE.SWIPER_DOT}
            activeDotStyle={STYLE.SWIPER_DOT_ACTIVE}
            style={styles.wallets}
          >
            {[
              ...wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} />),
              <WalletItem key="new" onOption={_onModalWallet} />,
            ]}
          </Swiper>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} />}
          renderItem={this._renderTransaction}
          style={[STYLE.LAYOUT_BOTTOM, styles.activity]}
        />
        <Footer navigate={navigate} />
        <Button
          accent
          animation={modalTransaction ? 'bounceOutDown' : 'bounceInUp'}
          delay={modalTransaction ? 0 : DURATION / 2}
          duration={DURATION}
          circle
          icon="operations"
          onPress={_onModal}
          style={styles.button}
        />
        <TransactionModal
          visible={modalTransaction}
          onClose={_onModal}
          onRequest={() => _onNewTransaction(REQUEST)}
          onSend={() => _onNewTransaction(SEND)}
        />
        <WalletModal visible={modalWallet} camera={importWallet} onClose={_onModalWallet} onSuccess={_onModalWallet} />
      </View>
    );
  }
}

Main.propTypes = {
  navigation: SHAPE.NAVIGATION,
  wallets: arrayOf(SHAPE.WALLET),
};

Main.defaultProps = {
  navigation: undefined,
  wallets: [],
};

const mapStateToProps = ({ wallets }) => ({
  wallets,
});

export default connect(mapStateToProps)(Main);
