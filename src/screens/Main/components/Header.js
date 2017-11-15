import { arrayOf, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Amount, Header } from '../../../components';
import { C, SHAPE } from '../../../config';
import styles from './Header.style';

const { SATOSHI } = C;


const HeaderTitle = ({ currencies, device, wallets }) => {
  const { currency } = device;
  let totalBalance = 0;
  let totalTrend = 0;

  wallets.forEach(({ balance, coin, trend }) => {
    const total = balance / (currencies[coin] / SATOSHI);
    totalBalance += total;
    totalTrend += total * (trend / 100);
  });

  return (
    <Header>
      <Amount coin={currency} value={totalBalance} style={styles.amount} />
      <Amount coin={currency} value={totalTrend} style={styles.trend} />
    </Header>
  );
};

HeaderTitle.propTypes = {
  currencies: SHAPE.CURRENCIES,
  device: SHAPE.DEVICE,
  wallets: arrayOf(SHAPE.WALLET),
};

HeaderTitle.defaultProps = {
  currencies: {},
  device: undefined,
  wallets: [],
};

const mapStateToProps = ({ currencies, device, wallets }) => ({
  currencies: currencies[device.currency],
  device,
  wallets,
});

export default connect(mapStateToProps)(HeaderTitle);
