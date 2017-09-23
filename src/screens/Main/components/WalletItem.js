import { array, bool, func, number, oneOfType } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { SHAPE, STYLE, THEME } from '../../../config';
import { Amount } from '../../../components';
import styles from './WalletItem.style';

const { COLOR } = THEME;

const WalletItem = ({ data, onPress, style }) => (
  <View style={[STYLE.ROW, styles.container]}>
    <View>
      <View style={styles.info}>
        <Text style={[styles.name, styles.label]}>{data.name.toUpperCase()}</Text>
        <Amount fixed={4} symbol={data.symbol} value={data.amount} style={[styles.text, styles.amount]} />
        <Amount value={0.00} symbol="$" style={[styles.label, styles.fiat]} />
      </View>
      <Text style={[styles.label, styles.state]}>progression</Text>
    </View>
    <View style={styles.qr}>
      <QRCode
        value={'http://sohobase.co'}
        size={64}
        fgColor={COLOR.WHITE}
        bgColor={COLOR.BLACK}
      />
    </View>
  </View>
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
