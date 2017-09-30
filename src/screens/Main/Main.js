import { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Button } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { TransactionService } from '../../services';
import { Header, Footer, TransactionModal, TransactionItem, WalletItem } from './components';
import styles from './Main.style';

const { DURATION } = THEME.ANIMATION;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: undefined,
      wallets: undefined,
      modal: false,
      prefetch: false,
      refreshing: false,
    };
    this._onModal = this._onModal.bind(this);
    this._onSwipeWallet = this._onSwipeWallet.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  async componentWillMount() {
    this.setState({
      transactions: await TransactionService.list(),
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

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  async _onSwipeWallet(event, { index }) {
    let transactions;

    this.setState({ refreshing: true });
    if (index === 0) transactions = await TransactionService.list();
    this.setState({ refreshing: false, transactions });
  }

  render() {
    const { _onModal, _onSwipeWallet } = this;
    const { navigation: { navigate }, wallets } = this.props;
    const { transactions = [], modal, refreshing } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header amount={1289.39} symbol="USD" trend={-123} />
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
          extraData={this.state}
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
        <TransactionModal visible={modal} onClose={_onModal} onRequest={_onModal} onSend={_onModal} />
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
