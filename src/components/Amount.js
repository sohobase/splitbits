import { array, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { STYLE } from '../config';
import styles from './Amount.style';

const Amount = ({ fixed, style, symbol, value }) => (
  <View style={STYLE.ROW}>
    { symbol &&
      <Text style={StyleSheet.flatten([styles.symbol, style])}>{symbol.toUpperCase()}</Text> }
    <Text style={StyleSheet.flatten([styles.value, style])}>
      {parseFloat(value).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
    </Text>
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
  symbol: undefined,
  value: 0,
};

export default Amount;
