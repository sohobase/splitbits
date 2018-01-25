import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import { C, SHAPE, STYLE, THEME } from '../../../config';
import { TransactionService, WalletService } from '../../../services';
import { updateTransactionsAction, updateWalletAction } from '../../../store/actions';
import { walletTransactions } from '../modules';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

const { STATE: { ARCHIVED, REQUESTED } } = C;
const { TRANSACTION, WALLET } = SHAPE;
const { ANIMATION: { DURATION } } = THEME;
let timeout;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  componentWillMount() {
    this._onRefresh();
  }

  componentWillReceiveProps({ wallet }) {
    const { wallet: { id } = {} } = this.props;
    if (wallet !== undefined && wallet.id !== id) this._onRefresh(wallet);
  }

  async _onRefresh(wallet = this.props.wallet) {
    const { props: { transactions = [], updateTransactions, updateWallet } } = this;
    const { blockHeight: lastBlock } = transactions[0] || {};

    timeout = setTimeout(() => this.setState({ refreshing: true }), DURATION / 2);
    WalletService.state({ id: wallet.id }).then(updateWallet);
    await TransactionService.list({ walletId: wallet.id, lastBlock }).then(updateTransactions);
    clearTimeout(timeout);
    this.setState({ refreshing: false });
  }

  _renderTransaction({ item }) {
    const { navigate, wallet } = this.props;
    return <TransactionItem data={item} onPress={() => navigate('Transaction', { item, wallet })} wallet={wallet} />;
  }

  render() {
    const {
      _onRefresh, _renderTransaction,
      props: { transactions = [] },
      state: { refreshing },
    } = this;

    return (
      <View style={[STYLE.LAYOUT_BOTTOM, styles.container]}>
        <Motion animation="bounceInUp" delay={DURATION / 2} duration={DURATION}>
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />}
            renderItem={_renderTransaction}
            style={styles.list}
          />
        </Motion>
      </View>
    );
  }
}

Transactions.propTypes = {
  navigate: func,
  transactions: arrayOf(shape(TRANSACTION)),
  updateTransactions: func,
  wallet: shape(WALLET),
};

Transactions.defaultProps = {
  navigate() {},
  transactions: [],
  updateTransactions() {},
  wallet: undefined,
};

const mapStateToProps = ({ device, transactions }, { wallet }) => ({
  transactions: walletTransactions(device, wallet, transactions),
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => transactions && dispatch(updateTransactionsAction(transactions)),
  updateWallet: wallet => wallet && dispatch(updateWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
