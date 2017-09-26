import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../config';
import styles from './Amount.style';

const SYMBOLS = {
  BTC: '฿',
  EUR: 'T',
  LTC: 'Ł',
  USD: '$',
};

const renderSymbol = (value, style) => (
  <Text style={[styles.amount, styles.symbol, style]}>
    {SYMBOLS[value.toUpperCase()] || value.toUpperCase()}
  </Text>
);

const Amount = ({ fixed, style, symbol, value }) => (
  <View style={STYLE.ROW}>
    { value < 0 && <Text style={[styles.amount, style]}>-</Text> }
    { symbol === 'USD' && renderSymbol(symbol, style) }
    <Text style={[styles.amount, style]}>
      {parseFloat(Math.abs(value)).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
    </Text>
    { symbol !== 'USD' && renderSymbol(symbol, style) }
  </View>
);

Amount.propTypes = {
  fixed: number,
  symbol: string,
  style: oneOfType(array, number),
  value: number,
};

Amount.defaultProps = {
  fixed: 2,
  style: [],
  symbol: 'BTC',
  value: 0,
};

export default Amount;
