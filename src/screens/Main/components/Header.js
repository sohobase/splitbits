import { arrayOf, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Amount, Header } from '../../../components';
import { SHAPE } from '../../../config';
import styles from './Header.style';

const HeaderTitle = ({ currencies, symbol, wallets }) => {
  let totalBalance = 0;
  let totalTrend = 0;
  wallets.forEach(({ balance, coin, trend }) => {
    const total = balance / currencies[coin];
    totalBalance += total;
    totalTrend += total * (trend / 100);
  });

  return (
    <Header>
      <Amount symbol={symbol} value={totalBalance} style={styles.amount} />
      <Amount symbol={symbol} value={totalTrend} style={styles.trend} />
    </Header>
  );
};

HeaderTitle.propTypes = {
  currencies: SHAPE.CURRENCIES,
  symbol: string,
  wallets: arrayOf(SHAPE.WALLET),
};

HeaderTitle.defaultProps = {
  currencies: {},
  symbol: undefined,
  wallets: [],
};

const mapStateToProps = ({ currencies, wallets }) => ({
  currencies,
  wallets,
});

export default connect(mapStateToProps)(HeaderTitle);
