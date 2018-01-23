import { array, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import { C, STYLE } from '../config';
import styles from './Amount.style';

const {
  CONVERSION, FIAT, SATOSHI, SYMBOL,
} = C;

const renderSymbol = ({ coin, style }, SYMBOLS = SYMBOL) => ( // eslint-disable-line
  <Text style={[styles.amount, style, styles.symbol]}>
    {Object.keys(SYMBOLS).includes(coin) ? SYMBOLS[coin] : SYMBOL[coin.toUpperCase()] || coin.toUpperCase()}
  </Text>
);

const Amount = (props) => {
  const {
    caption, coin, style, symbol,
  } = props;
  let { value } = props;
  let fixed = 0;
  let symbols;

  if (Object.values(FIAT).includes(coin)) {
    fixed = 2;
  } else {
    const satoshis = value * SATOSHI;
    if (satoshis > 0 && satoshis < 0.1) {
      value = parseInt(satoshis / CONVERSION[coin], 10);
      symbols = SYMBOL.FRIENDLY;
    } else {
      value = Math.round(satoshis * 10000) / 10000;
      fixed = (value.toString().split('.')[1] || []).length;
    }
  }

  return (
    <View style={STYLE.ROW}>
      { caption && <Text style={[styles.amount, style]}>{caption.replace(/\b\w/g, l => l.toUpperCase())}</Text> }
      { value < 0 && <Text style={[styles.amount, style]}>-</Text> }
      { symbol && value > 0 && <Text style={[styles.amount, style]}>+</Text> }
      { coin === FIAT.USD && renderSymbol(props, symbols) }
      <Text style={[styles.amount, style]}>
        {
          parseFloat(Math.abs(value))
            .toFixed(fixed)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }
      </Text>
      { coin !== FIAT.USD && renderSymbol(props, symbols) }
    </View>
  );
};

Amount.propTypes = {
  caption: string,
  coin: string,
  style: oneOfType([array, number]),
  symbol: bool,
  value: number,
};

Amount.defaultProps = {
  caption: undefined,
  coin: 'BTC',
  style: [],
  symbol: false,
  value: 0,
};

export default Amount;
