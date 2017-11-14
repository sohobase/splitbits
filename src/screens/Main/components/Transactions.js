import { arrayOf, func } from 'prop-types';
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

  componentDidMount() {
    const { wallet } = this.props;
    if (wallet) this._onRefresh(wallet);
  }

  componentWillReceiveProps({ wallet }) {
    const { wallet: { id } = {} } = this.props;
    if (wallet && wallet.id && wallet.id !== id) this._onRefresh(wallet);
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
  transactions: arrayOf(SHAPE.TRANSACTION),
  updateTransactions: func,
  wallet: SHAPE.WALLET,
};

Transactions.defaultProps = {
  navigate() {},
  transactions: [],
  updateTransactions() {},
  wallet: undefined,
};

const mapStateToProps = ({ transactions = [] }, { wallet: { address } = {} }) => ({
  transactions: transactions.filter(({ from, to }) => from.address === address || to.address === address),
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => dispatch(updateTransactionsAction(transactions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
