import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import { SHAPE, STYLE, THEME } from '../../../config';
import { TransactionService, WalletService } from '../../../services';
import { updateTransactionsAction, updateWalletAction } from '../../../store/actions';
import { walletTransactions } from '../modules';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

const { TRANSACTION, WALLET } = SHAPE;
const { ANIMATION: { DURATION } } = THEME;
let timeout;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
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

  render() {
    const {
      _onRefresh,
      props: { navigate, transactions = [], wallet },
      state: { refreshing },
    } = this;

    return (
      <View style={STYLE.LAYOUT_BOTTOM}>
        <Motion animation="bounceInUp" delay={DURATION} duration={DURATION}>
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />}
            renderItem={({ item }) =>
              <TransactionItem data={item} onPress={() => navigate('Transaction', { item, wallet })} wallet={wallet} />}
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
