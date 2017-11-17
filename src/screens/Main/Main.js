import { arrayOf, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE } from '../../config';
import { WalletModal, MnemonicModal } from '../../containers';
import {
  Header, Footer, TransactionButton, TransactionModal, Transactions, WalletItem, WalletInfoModal,
} from './components';
import styles from './Main.style';

const { TYPE: { REQUEST, SEND }, VERB: { IMPORT } } = C;
const { NAVIGATION, WALLET } = SHAPE;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importWallet: false,
      index: undefined,
      modalTransaction: false,
      modalWallet: false,
      modalWalletInfo: false,
      modalMnemonic: false,
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

  _onMnemonic() {
    this.setState({ modalMnemonic: !this.state.modalMnemonic });
  }

  _onWallet() {
    this.setState({ modalWalletInfo: !this.state.modalWalletInfo });
  }

  async _onSwipeWallet(event, { index }) {
    this.setState({ index });
  }

  render() {
    const {
      _onNewTransaction, _onMnemonic, _onModal, _onModalWallet, _onSwipeWallet, _onWallet,
      props: { navigation: { navigate }, wallets = [] },
      state: {
        index = 0, importWallet, modalMnemonic, modalTransaction, modalWallet, modalWalletInfo,
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
        <TransactionButton onPress={_onModal} visible={!modalTransaction} />
        <TransactionModal
          visible={modalTransaction}
          onClose={_onModal}
          onRequest={() => _onNewTransaction(REQUEST)}
          onSend={() => _onNewTransaction(SEND)}
        />
        <WalletModal visible={modalWallet} camera={importWallet} onClose={_onModalWallet} onSuccess={_onModalWallet} />
        { wallets[index] &&
          <WalletInfoModal
            visible={modalWalletInfo}
            wallet={wallets[index]}
            onBackup={_onMnemonic}
            onClose={_onWallet}
          /> }
        <MnemonicModal visible={modalMnemonic} readOnly onClose={_onMnemonic} wallet={wallets[index]} />
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
