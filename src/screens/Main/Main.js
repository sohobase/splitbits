import { arrayOf, func, shape } from 'prop-types';
import { LinearGradient, Notifications } from 'expo';
import React, { Component } from 'react';
import { AppState, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { C, SHAPE, STYLE, THEME } from '../../config';
import { ModalMnemonic, ModalTransaction, ModalWallet, ModalWalletNew } from '../../containers';
import { Header, Footer, TransactionButton, Transactions, Wallets } from './components';
import { onAppActive, onNotification } from './modules';
import { ConnectionService, CurrenciesService, DeviceService } from '../../services';
import { updateCurrenciesAction, updateDeviceAction } from '../../store/actions';
import styles from './Main.style';

const { CONNECTION: { WIFI }, TYPE } = C;
const { COLOR } = THEME;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: undefined,
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
    this._setConnection = this._setConnection.bind(this);
  }

  async componentWillMount() {
    const { _setConnection, props: { updateCurrencies, updateDevice } } = this;
    Promise.all([
      CurrenciesService.list().then(updateCurrencies),
      DeviceService.state().then(updateDevice),
    ]);
    AppState.addEventListener('change', async(state) => {
      _setConnection();
      onAppActive(this.props, state);
    });
    _setConnection();
    ConnectionService.listen(_setConnection);
    Notifications.addListener(onNotification);
  }

  async _setConnection(connection) {
    this.setState({ connection: connection || await ConnectionService.get() });
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
    if (context !== TYPE.RECOVER) {
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
      props: { i18n, navigation: { navigate }, wallets },
      state: {
        connection, context, hexSeed, showMnemonic, showTransaction, showWalletNew, showWallet, walletIndex,
      },
    } = this;
    const wallet = wallets[walletIndex];
    const focus = !showTransaction && !showWallet && !showWalletNew;
    const isOffline = connection === undefined;


    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={COLOR.GRADIENT} style={STYLE.LAYOUT_TOP} >
          <Header />
          <Wallets index={walletIndex} onNew={_onModalWallet} onOptions={_onWallet} onSwipe={_onSwipe} />
          { connection === WIFI && <Text style={styles.warning}>{i18n.UNSECURED_CONNECTION}</Text> }
        </LinearGradient>
        <Transactions navigate={navigate} wallet={wallet} />
        <Footer navigate={navigate} elevation={focus} />
        <TransactionButton onPress={_onModal} visible={focus && wallet !== undefined && !isOffline} />
        <ModalTransaction visible={showTransaction} onClose={_onModal} onPress={_onNewTransaction} wallet={wallet} />
        <ModalWalletNew
          visible={showWalletNew}
          camera={context === TYPE.IMPORT}
          hexSeed={hexSeed}
          onClose={_onModalWallet}
          onSuccess={_onModalWallet}
        />
        { wallet &&
          <ModalWallet visible={showWallet && !showMnemonic} wallet={wallet} onBackup={_onMnemonic} onClose={_onWallet} /> }
        <ModalMnemonic visible={showMnemonic} onClose={_onMnemonic} onRecover={_onRecover} wallet={wallet} />
      </View>
    );
  }
}

Main.propTypes = {
  i18n: shape({}).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  updateCurrencies: func,
  updateDevice: func,
  wallets: arrayOf(shape(SHAPE.WALLET)).isRequired,
};

Main.defaultProps = {
  updateCurrencies() {},
  updateDevice() {},
};

const mapStateToProps = ({ i18n, wallets }) => ({
  i18n, wallets,
});

const mapDispatchToProps = dispatch => ({
  updateCurrencies: currencies => currencies && dispatch(updateCurrenciesAction(currencies)),
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
