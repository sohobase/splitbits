import { array, func, number, oneOfType } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { SHAPE, STYLE, THEME } from '../../../config';
import { Amount, Icon } from '../../../components';
import styles from './WalletItem.style';

const { ANIMATION: { DURATION }, COLOR, QR_SIZE } = THEME;

const WalletItem = ({ currencies, data: { address, balance = 0, coin, name, trend = 0 }, device: { currency }, onPress, style }) => (
  <Animatable
    animation="bounceIn"
    duration={DURATION}
    onPress={onPress}
    style={[styles.container, style]}
  >
    <View style={styles.content}>
      <View style={styles.info}>
        <Text style={[styles.name, styles.label]}>{name.toUpperCase()}</Text>
        <Amount coin={coin} value={balance} style={[styles.text, styles.amount]} />
        <Amount coin={currency} value={balance / currencies[coin]} style={[styles.label, styles.fiat]} />
      </View>
      <View style={STYLE.ROW}>
        <Icon value={trend > 0 ? 'trendingUp' : 'trendingDown'} style={styles.trend} />
        <Text style={[styles.label]}>{`${trend.toFixed(2)}%`}</Text>
      </View>
      <View style={styles.qr}>
        <QRCode
          value={address}
          size={QR_SIZE}
          fgColor={COLOR.WHITE}
          bgColor={COLOR.BLACK}
        />
      </View>
    </View>
  </Animatable>
);

WalletItem.propTypes = {
  currencies: SHAPE.CURRENCIES,
  data: SHAPE.WALLET,
  device: SHAPE.DEVICE,
  onPress: func,
  style: oneOfType(array, number),
};

WalletItem.defaultProps = {
  currencies: {},
  data: {},
  device: {},
  onPress: undefined,
  style: [],
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies,
  device,
});

export default connect(mapStateToProps)(WalletItem);
