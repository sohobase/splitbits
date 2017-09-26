import { func } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Amount, Touchable } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './TransactionItem.style';

const TransactionItem = ({ data: { wallet = {}, amount, symbol, createdAt }, onPress }) => (
  <Touchable onPress={onPress} activeOpacity={0.95}>
    <View style={[STYLE.ROW, styles.container]}>
      <Image style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name]}>{wallet.name}</Text>
        <Text style={[styles.label, styles.date]}>{createdAt.toString().substr(0, 10)}</Text>
      </View>
      <View style={styles.amounts}>
        <Amount fixed={4} symbol={symbol} value={amount} style={[styles.amount]} />
        <Amount value={0.00} symbol="$" style={[styles.label, styles.fiat]} />
      </View>
    </View>
  </Touchable>
);

TransactionItem.propTypes = {
  data: SHAPE.ACTIVITY,
  onPress: func,
};

TransactionItem.defaultProps = {
  data: {},
  onPress: undefined,
};

export default TransactionItem;
