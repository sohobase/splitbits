import { func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { Amount, Touchable } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './WalletItem.style';

const WalletItem = ({
  data: {
    id, balance, coin, name,
  },
  onPress,
}) => (
  <Touchable onPress={() => onPress(id)} activeOpacity={0.95}>
    <View style={STYLE.LIST_ITEM}>
      <Text style={styles.name}>{name}</Text>
      <Amount coin={coin} value={balance} style={styles.balance} />
    </View>
  </Touchable>
);

WalletItem.propTypes = {
  data: shape(SHAPE.WALLET).isRequired,
  onPress: func,
};

WalletItem.defaultProps = {
  onPress() {},
};

export default WalletItem;
