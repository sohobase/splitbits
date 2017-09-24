import { array, func, number, oneOfType } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { SHAPE, THEME } from '../../../config';
import { Amount } from '../../../components';
import styles from './WalletItem.style';

const { COLOR } = THEME;

const WalletItem = ({ data, onPress, style }) => (
  <Animatable
    animation="bounceIn"
    onPress={onPress}
    style={[styles.container, style]}
  >
    <View style={styles.content}>
      <View style={styles.info}>
        <Text style={[styles.name, styles.label]}>{data.name.toUpperCase()}</Text>
        <Amount fixed={4} symbol={data.symbol} value={data.amount} style={[styles.text, styles.amount]} />
        <Amount value={0.00} symbol="$" style={[styles.label, styles.fiat]} />
      </View>
      <Text style={[styles.label]}>progression</Text>
      <View style={styles.qr}>
        <QRCode
          value={'http://sohobase.co'}
          size={64}
          fgColor={COLOR.WHITE}
          bgColor={COLOR.BLACK}
        />
      </View>
    </View>
  </Animatable>
);

WalletItem.propTypes = {
  data: SHAPE.WALLET,
  onPress: func,
  style: oneOfType(array, number),
};

WalletItem.defaultProps = {
  data: {},
  onPress: undefined,
  style: [],
};

export default WalletItem;
