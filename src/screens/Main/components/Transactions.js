import { arrayOf, func, string } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import { TransactionService } from '../../../services';
import { updateTransactionsAction } from '../../../store/actions';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  async componentWillReceiveProps({ walletId }) {
    if (walletId && walletId !== this.props.walletId) this._onRefresh(walletId);
  }

  async _onRefresh(walletId = this.props.walletId) {
    const { updateTransactions } = this.props;
    this.setState({ refreshing: true });
    updateTransactions(await TransactionService.list(walletId));
    this.setState({ refreshing: false });
  }

  _renderTransaction({ item }) {
    const { navigate } = this.props;
    return <TransactionItem data={item} onPress={() => navigate('Transaction', { item })} />;
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
  transactions: arrayOf(SHAPE.TRANSACTION),
  updateTransactions: func,
  walletId: string,
};

Transactions.defaultProps = {
  navigate() {},
  transactions: [],
  updateTransactions() {},
  walletId: undefined,
};

const mapStateToProps = ({ transactions }) => ({
  transactions,
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => dispatch(updateTransactionsAction(transactions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
