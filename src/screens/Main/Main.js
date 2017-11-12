import { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Button } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { WalletModal } from '../../containers';
import { Header, Footer, TransactionModal, Transactions, WalletItem } from './components';
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
    };
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onModalWallet = this._onModalWallet.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
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
    this.setState({ index });
  }

  render() {
    const {
      _onNewTransaction, _onModal, _onModalWallet, _onSwipeWallet,
      props: { navigation: { navigate }, wallets = [] },
      state: { index = 0, importWallet, modalTransaction, modalWallet },
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
              ...wallets.map(wallet => <WalletItem key={wallet.id} data={wallet} />),
              <WalletItem key="new" onOption={_onModalWallet} />,
            ]}
          </Swiper>
        </View>
        <Transactions navigate={navigate} wallet={wallets[index]} />
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
