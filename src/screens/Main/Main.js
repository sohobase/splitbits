import { arrayOf, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, TEXT } from '../../config';
import { ModalMnemonic, ModalTransaction, ModalWallet, ModalWalletNew } from '../../containers';
import { Header, Footer, TransactionButton, Transactions, WalletItem } from './components';
import styles from './Main.style';

const { TYPE: { REQUEST, SEND } } = C;
const { EN: { IMPORT, RECOVER } } = TEXT;
const { NAVIGATION, WALLET } = SHAPE;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: undefined,
      index: undefined,
      showTransaction: false,
      showWalletNew: false,
      showWallet: false,
      showMnemonic: false,
    };
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onMnemonic = this._onMnemonic.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onModalWallet = this._onModalWallet.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  _onNewTransaction(type) {
    const {
      props: { navigation: { navigate }, wallets },
      state: { index = 0, showTransaction },
    } = this;

    this.setState({ showTransaction: !showTransaction });
    navigate('Transaction', { type, wallet: wallets[index] });
  }

  _onModal() {
    this.setState({ showTransaction: !this.state.showTransaction });
  }

  _onModalWallet(context) {
    const nextState = { context };
    if (context !== RECOVER) {
      nextState.showWalletNew = !this.state.showWalletNew;
    } else {
      nextState.showMnemonic = !this.state.showMnemonic;
    }
    this.setState(nextState);
  }

  _onMnemonic() {
    this.setState({ showMnemonic: !this.state.showMnemonic });
  }

  _onWallet() {
    this.setState({ showWallet: !this.state.showWallet });
  }

  async _onSwipeWallet(event, { index }) {
    this.setState({ index });
  }

  render() {
    const {
      _onNewTransaction, _onMnemonic, _onModal, _onModalWallet, _onSwipeWallet, _onWallet,
      props: { navigation: { navigate }, wallets = [] },
      state: {
        context, index = 0, showMnemonic, showTransaction, showWalletNew, showWallet,
      },
    } = this;

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
              ...wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} onPress={_onWallet} />),
              <WalletItem key="new" onOption={_onModalWallet} />,
            ]}
          </Swiper>
        </View>
        <Transactions navigate={navigate} wallet={wallets[index]} />
        <Footer navigate={navigate} />
        <TransactionButton onPress={_onModal} visible={!showTransaction} />
        <ModalTransaction
          visible={showTransaction}
          onClose={_onModal}
          onRequest={() => _onNewTransaction(REQUEST)}
          onSend={() => _onNewTransaction(SEND)}
        />
        <ModalWalletNew
          visible={showWalletNew}
          camera={context === IMPORT}
          onClose={_onModalWallet}
          onSuccess={_onModalWallet}
        />
        { wallets[index] &&
          <ModalWallet
            visible={showWallet}
            wallet={wallets[index]}
            onBackup={_onMnemonic}
            onClose={_onWallet}
          /> }
        <ModalMnemonic visible={showMnemonic} onClose={_onMnemonic} wallet={wallets[index]} />
      </View>
    );
  }
}

Main.propTypes = {
  navigation: shape(NAVIGATION),
  wallets: arrayOf(shape(WALLET)),
};

Main.defaultProps = {
  navigation: undefined,
  wallets: [],
};

const mapStateToProps = ({ wallets }) => ({
  wallets,
});

export default connect(mapStateToProps)(Main);
