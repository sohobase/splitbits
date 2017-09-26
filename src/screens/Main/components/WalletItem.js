import { array, func, number, oneOfType } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { SHAPE, STYLE, THEME } from '../../../config';
import { Amount, Icon } from '../../../components';
import styles from './WalletItem.style';

const { ANIMATION: { DURATION }, COLOR } = THEME;

const WalletItem = ({ data, onPress, style }) => (
  <Animatable
    animation="bounceIn"
    duration={DURATION}
    onPress={onPress}
    style={[styles.container, style]}
  >
    <View style={styles.content}>
      <View style={styles.info}>
        <Text style={[styles.name, styles.label]}>{data.name.toUpperCase()}</Text>
        <Amount fixed={4} symbol={data.symbol} value={data.amount} style={[styles.text, styles.amount]} />
        <Amount value={0.00} symbol="USD" style={[styles.label, styles.fiat]} />
      </View>
      <View style={STYLE.ROW}>
        <Icon value="trendingUp" style={styles.trend} />
        <Text style={[styles.label]}>0.56%</Text>
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
