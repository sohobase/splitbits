import { number } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../../../config';
import { Amount } from '../../../components';
import styles from './Header.style';

const HeaderTitle = ({ amount, trend }) => (
  <View style={[STYLE.CENTERED, styles.container]}>
    <Amount symbol="$" value={12039.23} style={styles.amount} />
    <View style={STYLE.ROW}>
      <Text style={styles.trend}>+</Text>
      <Amount symbol="$" value={100.23} style={styles.trend} />
    </View>
  </View>
);

HeaderTitle.propTypes = {
  amount: number,
  trend: number,
};

HeaderTitle.defaultProps = {
  amount: undefined,
  trend: undefined,
};

export default HeaderTitle;
