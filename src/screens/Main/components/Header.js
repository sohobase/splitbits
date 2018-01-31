import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Amount, Button, Header } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import Tag from './Tag';
import styles from './Header.style';

const { SATOSHI } = C;

const HeaderTitle = ({
  currencies, device, i18n, navigation: { navigate }, wallets,
}) => {
  const { currency } = device;
  let totalBalance = 0;
  let totalTrend = 0;

  wallets.forEach(({ balance, coin, trend }) => {
    const total = balance / (currencies[coin] / SATOSHI);
    totalBalance += total;
    totalTrend += total * (trend / 100);
  });
  const trend = parseInt((totalTrend * 100) / totalBalance, 10);

  return (
    <Header>
      <View style={[STYLE.ROW, styles.container]}>
        <View style={[styles.amounts]}>
          <Text style={styles.title}>{i18n.TOTAL_BALANCE.toUpperCase()}</Text>
          <View style={STYLE.ROW}>
            <Amount coin={currency} value={totalBalance} style={styles.amount} />
            { trend !== 0 && <Tag style={styles.tag} title={`${trend > 0 ? '+' : ''}${trend}%`} /> }
          </View>
        </View>
        <Button icon="settings" raised style={styles.button} onPress={() => navigate('Settings')} />
      </View>
    </Header>
  );
};

HeaderTitle.propTypes = {
  currencies: shape(SHAPE.CURRENCIES),
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  wallets: arrayOf(shape(SHAPE.WALLET)).isRequired,
};

HeaderTitle.defaultProps = {
  currencies: {},
};

const mapStateToProps = ({
  currencies, device, i18n, wallets,
}) => ({
  currencies: currencies[device.currency],
  device,
  i18n,
  wallets,
});

export default connect(mapStateToProps)(HeaderTitle);
