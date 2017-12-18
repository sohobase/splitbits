import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { C, STYLE } from '../config';
import styles from './Amount.style';

const { FIAT, SATOSHI, SYMBOL } = C;

const SYMBOL_FRIENDLY = {
  BTC: ' Bits',
  LTC: ' Lites',
};

const COIN_FRIENDLY = {
  BTC: 0.000001,
  LTC: 0.001,
};

const renderSymbol = ({ coin, style }, SYMBOLS = SYMBOL) => ( // eslint-disable-line
  <Text style={[styles.amount, styles.symbol, style]}>
    {Object.keys(SYMBOLS).includes(coin) ? SYMBOLS[coin] : SYMBOL[coin.toUpperCase()] || coin.toUpperCase()}
  </Text>
);

const Amount = (props) => {
  const { caption, coin, style } = props;
  let { value } = props;
  let fixed = 0;
  let symbols;

  if (Object.values(FIAT).includes(coin)) {
    fixed = 2;
  } else {
    const satoshis = value * SATOSHI;
    if (satoshis > 0 && satoshis < 0.1) {
      value = parseInt(satoshis / COIN_FRIENDLY[coin], 10);
      symbols = SYMBOL_FRIENDLY;
    } else {
      value = Math.round(satoshis * 10000) / 10000;
      fixed = (value.toString().split('.')[1] || []).length;
    }
  }

  return (
    <View style={STYLE.ROW}>
      { caption && <Text style={[styles.amount, style]}>{caption.replace(/\b\w/g, l => l.toUpperCase())}</Text> }
      { value < 0 && <Text style={[styles.amount, style]}>-</Text> }
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
  value: number,
};

Amount.defaultProps = {
  caption: undefined,
  coin: 'BTC',
  style: [],
  value: 0,
};

export default Amount;
