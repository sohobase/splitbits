import { number, string } from 'prop-types';
import React from 'react';
import { Amount, Header } from '../../../components';
import styles from './Header.style';

const HeaderTitle = ({ amount, symbol, trend }) => (
  <Header>
    <Amount symbol={symbol} value={amount} style={styles.amount} />
    <Amount symbol={symbol} value={trend} style={styles.trend} />
  </Header>
);

HeaderTitle.propTypes = {
  amount: number,
  symbol: string,
  trend: number,
};

HeaderTitle.defaultProps = {
  amount: undefined,
  symbol: undefined,
  trend: undefined,
};

export default HeaderTitle;
