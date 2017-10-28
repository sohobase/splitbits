import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../config';
import styles from './Amount.style';

const SYMBOLS = {
  BTC: '฿',
  EUR: '€',
  LTC: 'Ł',
  USD: '$',
};

const renderSymbol = (value, style) => (
  <Text style={[styles.amount, styles.symbol, style]}>
    {SYMBOLS[value.toUpperCase()] || value.toUpperCase()}
  </Text>
);

const Amount = ({ caption, fixed, style, symbol, value }) => (
  <View style={STYLE.ROW}>
    { caption && <Text style={[styles.amount, style]}>{caption}</Text> }
    { value < 0 && <Text style={[styles.amount, style]}>-</Text> }
    { symbol === 'USD' && renderSymbol(symbol, style) }
    <Text style={[styles.amount, style]}>
      {parseFloat(Math.abs(value)).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
    </Text>
    { symbol !== 'USD' && renderSymbol(symbol, style) }
  </View>
);

Amount.propTypes = {
  caption: string,
  fixed: number,
  symbol: string,
  style: oneOfType(array, number),
  value: number,
};

Amount.defaultProps = {
  caption: undefined,
  fixed: 2,
  style: [],
  symbol: 'BTC',
  value: 0,
};

export default Amount;
