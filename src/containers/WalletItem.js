import { array, func, oneOfType, number, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import { Amount, Touchable } from '../components';
import { SHAPE, STYLE } from '../config';
import styles from './WalletItem.style';

const WalletItem = ({ data = {}, onPress, style }) => (
  <Touchable onPress={() => onPress(data)} activeOpacity={0.95}>
    <View style={[STYLE.LIST_ITEM, style]}>
      <Text style={styles.name}>{data.name}</Text>
      <Amount coin={data.coin} value={data.balance} style={styles.balance} />
    </View>
  </Touchable>
);

WalletItem.propTypes = {
  data: shape(SHAPE.WALLET).isRequired,
  onPress: func,
  style: oneOfType([array, number]),
};

WalletItem.defaultProps = {
  onPress() {},
  style: [],
};

export default WalletItem;
