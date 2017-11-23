import { array, func, number, oneOfType, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, TEXT, THEME } from '../../../config';
import { Amount, Button, Icon } from '../../../components';
import styles from './WalletItem.style';

const { SATOSHI, TYPE: { PRO } } = C;
const {
  EN: {
    CREATE, IMPORT, NEW_WALLET, READ_ONLY, RECOVER,
  },
} = TEXT;
const { CURRENCIES, DEVICE, WALLET } = SHAPE;
const { ANIMATION: { DURATION } } = THEME;

const WalletOption = ({ type, onPress }) => ( // eslint-disable-line
  <View style={[STYLE.CENTERED, styles.option]}>
    <Button icon={type} circle onPress={() => onPress(type)} style={styles.button} captionStyle={styles.caption} />
    <Text style={[styles.label, styles.highlight]}>{type}</Text>
  </View>
);

const WalletItem = ({
  currencies, data, device: { currency }, onOption, onPress, style,
}) => {
  const {
    balance = 0, coin = 'BTC', hexSeed, name = '', trend = 0, type, wif,
  } = data || {};

  return (
    <Motion
      animation="bounceIn"
      duration={DURATION}
      style={[STYLE.ELEVATION, styles.container, (!data ? styles.empty : undefined), style]}
    >
      {
        data ?
          <View style={styles.content}>
            <Button captionStyle={styles.menuIcon} icon="menu" onPress={onPress} raised style={styles.menu} />
            <View style={styles.info}>
              <View style={STYLE.ROW}>
                <Text style={[styles.name, styles.label]}>{name.toUpperCase()}</Text>
              </View>
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
              <View style={styles.tags}>
                { !hexSeed && !wif && <View style={styles.tag}><Text style={styles.tagLabel}>{READ_ONLY}</Text></View> }
                { type === PRO && <View style={[styles.tag, styles.pro]}><Text style={styles.tagLabel}>PRO</Text></View> }
              </View>
            </View>
          </View>
          :
          <View style={[STYLE.CENTERED, styles.options]}>
            <Text style={[styles.name, styles.highlight]}>{NEW_WALLET}</Text>
            <View style={[STYLE.ROW]}>
              <WalletOption type={CREATE} onPress={onOption} />
              <WalletOption type={IMPORT} onPress={onOption} />
              <WalletOption type={RECOVER} onPress={onOption} />
            </View>
          </View>
      }
    </Motion>
  );
};

WalletItem.propTypes = {
  currencies: shape(CURRENCIES),
  data: shape(WALLET),
  device: shape(DEVICE),
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
