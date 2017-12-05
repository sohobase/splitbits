import { arrayOf, shape } from 'prop-types';
import { Notifications } from 'expo';
import React, { Component } from 'react';
import { AppState, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, TEXT } from '../../config';
import { ModalMnemonic, ModalTransaction, ModalWallet, ModalWalletNew } from '../../containers';
import { Header, Footer, TransactionButton, Transactions, Wallets } from './components';
import { onAppActive, onNotification } from './modules';
import styles from './Main.style';

const { DEV } = C;
const { EN: { IMPORT, RECOVER } } = TEXT;
const { NAVIGATION, WALLET } = SHAPE;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: undefined,
      hexSeed: undefined,
      showTransaction: false,
      showWalletNew: false,
      showWallet: false,
      showMnemonic: false,
      walletIndex: 0,
    };
    this._onMnemonic = this._onMnemonic.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onModalWallet = this._onModalWallet.bind(this);
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onRecover = this._onRecover.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  componentWillMount() {
    AppState.addEventListener('change', state => onAppActive(this.props, state));
    Notifications.addListener(onNotification);
  }

  componentWillReceiveProps({ wallets: nextWallets = [] }) {
    const { wallets = [] } = this.props;
    // @TODO: React-Native-Swiper is buggy with dynamic elements. we should focus in the last wallet created.
    if (nextWallets.length !== wallets.length) this.setState({ walletIndex: 0 });
  }

  _onNewTransaction(type) {
    const {
      props: { navigation: { navigate }, wallets },
      state: { showTransaction, walletIndex },
    } = this;

    this.setState({ showTransaction: !showTransaction });
    navigate('Transaction', { type, wallet: wallets[walletIndex] });
  }

  _onModal() {
    this.setState({ showTransaction: !this.state.showTransaction });
  }

  _onModalWallet(context) {
    const nextState = { context, hexSeed: undefined };
    if (context !== RECOVER) {
      nextState.showWalletNew = !this.state.showWalletNew;
    } else {
      nextState.showMnemonic = !this.state.showMnemonic;
    }
    this.setState(nextState);
  }

  _onMnemonic() {
    this.setState({ showMnemonic: !this.state.showMnemonic, hexSeed: undefined });
  }

  _onRecover(hexSeed) {
    this.setState({ showMnemonic: false, showWalletNew: true, hexSeed });
  }

  _onSwipe(walletIndex) {
    this.setState({ walletIndex });
  }

  _onWallet() {
    this.setState({ showWallet: !this.state.showWallet });
  }

  render() {
    const {
      _onNewTransaction, _onMnemonic, _onModal, _onModalWallet, _onRecover, _onSwipe, _onWallet,
      props: { navigation: { navigate }, wallets },
      state: {
        context, hexSeed, showMnemonic, showTransaction, showWalletNew, showWallet, walletIndex,
      },
    } = this;
    const wallet = wallets[walletIndex];
    const focus = !showTransaction && !showWallet && !showWalletNew;

    return (
      <View style={STYLE.SCREEN}>
        <View style={[STYLE.LAYOUT_TOP, (wallet && STYLE[wallet.coin])]}>
          { DEV && <Text style={styles.env}>testnet</Text> }
          <Header />
          <Wallets onNew={_onModalWallet} onOptions={_onWallet} onSwipe={_onSwipe} />
        </View>
        <Transactions navigate={navigate} wallet={wallet} />
        <Footer navigate={navigate} elevation={focus} />
        <TransactionButton onPress={_onModal} visible={focus && wallet !== undefined} />
        <ModalTransaction visible={showTransaction} onClose={_onModal} onPress={_onNewTransaction} wallet={wallet} />
        <ModalWalletNew
          visible={showWalletNew}
          camera={context === IMPORT}
          hexSeed={hexSeed}
          onClose={_onModalWallet}
          onSuccess={_onModalWallet}
        />
        { wallet &&
          <ModalWallet visible={showWallet} wallet={wallet} onBackup={_onMnemonic} onClose={_onWallet} /> }
        <ModalMnemonic visible={showMnemonic} onClose={_onMnemonic} onRecover={_onRecover} wallet={wallet} />
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
