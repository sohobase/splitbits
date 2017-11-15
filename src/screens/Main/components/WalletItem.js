import { array, func, number, oneOfType } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import { Amount, Button, Icon } from '../../../components';
import styles from './WalletItem.style';

const { ANIMATION: { DURATION }, COLOR, QR_SIZE } = THEME;
const { SATOSHI, TYPE: { PRO }, VERB: { CREATE, IMPORT } } = C;

const WalletOption = ({ type, onPress }) => ( // eslint-disable-line
  <View style={[STYLE.CENTERED, styles.option]}>
    <Button icon={type} circle onPress={() => onPress(type)} style={styles.button} captionStyle={styles.caption} />
    <Text style={[styles.label, styles.highlight]}>{type}</Text>
  </View>
);

const WalletItem = ({ currencies, data, device: { currency }, onOption, onPress, style }) => {
  const { address, balance = 0, coin = 'BTC', name, trend = 0, type } = data || {};

  return (
    <Animatable
      animation="bounceIn"
      duration={DURATION}
      onPress={onPress}
      style={[styles.container, (!data ? styles.empty : undefined), style]}
    >
      {
        data ?
          <View style={styles.content}>
            <View style={styles.info}>
              <Text style={[styles.name, styles.label]}>{name.toUpperCase()}</Text>
              { type === PRO && <Text style={styles.pro}>PRO</Text> }
              <Amount coin={coin} value={balance} style={[styles.text, styles.amount]} />
              <Amount
                coin={currency}
                value={balance / (currencies[coin] / SATOSHI)}
                style={[styles.label, styles.fiat]}
              />
            </View>
            <View style={STYLE.ROW}>
              <Icon value={trend > 0 ? 'trendingUp' : 'trendingDown'} style={styles.trend} />
              <Text style={[styles.label]}>{`${trend.toFixed(2)}%`}</Text>
            </View>
            <View style={styles.qr}>
              <QRCode value={address} size={QR_SIZE} fgColor={COLOR.WHITE} bgColor={COLOR.BLACK} />
            </View>
          </View>
          :
          <View style={[STYLE.CENTERED, styles.options]}>
            <Text style={[styles.name, styles.highlight]}>Add Wallet</Text>
            <View style={[STYLE.ROW]}>
              <WalletOption type={CREATE} onPress={onOption} />
              <WalletOption type={IMPORT} onPress={onOption} />
            </View>
          </View>
      }
    </Animatable>
  );
};

WalletItem.propTypes = {
  currencies: SHAPE.CURRENCIES,
  data: SHAPE.WALLET,
  device: SHAPE.DEVICE,
  onOption: func,
  onPress: func,
  style: oneOfType([array, number]),
};

WalletItem.defaultProps = {
  currencies: {},
  data: undefined,
  device: {},
  onOption: undefined,
  onPress: undefined,
  style: [],
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies: currencies[device.currency],
  device,
});

export default connect(mapStateToProps)(WalletItem);
