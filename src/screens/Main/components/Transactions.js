import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE } from '../../../config';
import { TransactionService } from '../../../services';
import { updateTransactionsAction } from '../../../store/actions';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

const { STATE: { ARCHIVED, REQUESTED } } = C;
const { TRANSACTION, WALLET } = SHAPE;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  componentWillReceiveProps({ wallet = {} }) {
    const { wallet: { id } = {} } = this.props;
    if (wallet.id !== undefined && wallet.id !== id) this._onRefresh(wallet);
  }

  async _onRefresh(wallet = this.props.wallet) {
    const { updateTransactions } = this.props;
    this.setState({ refreshing: true });
    updateTransactions(await TransactionService.list(wallet.id));
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
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />}
        renderItem={_renderTransaction}
        style={[STYLE.LAYOUT_BOTTOM, styles.container]}
      />
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

const mapStateToProps = ({ device, transactions = [] }, { wallet = {} }) => ({
  transactions: transactions.filter(({
    coin, from, state, to,
  }) => (
    coin === wallet.coin &&
    state !== ARCHIVED &&
    (
      [from.address, to.address].includes(wallet.address) ||
      (state === REQUESTED && [from.device, to.device].includes(device.id))
    )
  )),
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => dispatch(updateTransactionsAction(transactions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
