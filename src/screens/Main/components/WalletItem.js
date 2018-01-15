import { array, func, number, oneOfType, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import { Amount, Button, Icon } from '../../../components';
import styles from './WalletItem.style';

const { SATOSHI, TYPE } = C;
const { ANIMATION: { DURATION } } = THEME;

const WalletOption = ({
  caption, onPress, type, //eslint-disable-line
}) => (
  <View style={[STYLE.CENTERED, styles.option]}>
    <Button icon={type} circle onPress={() => onPress(type)} style={styles.button} captionStyle={styles.caption} />
    <Text style={[styles.label, styles.highlight]}>{caption}</Text>
  </View>
);

const WalletItem = ({
  currencies, data, device: { currency }, i18n, onOption, onPress, style,
}) => {
  const {
    balance = 0, coin = 'BTC', name = '', readOnly, trend = 0, type,
  } = data || {};

  return (
    <Motion
      animation="bounceIn"
      delay={300}
      duration={DURATION}
      style={[STYLE.ELEVATION, styles.container, (!data ? styles.empty : undefined), style]}
    >
      {
        data ?
          <View style={styles.content}>
            <View style={[STYLE.ROW, styles.info]}>
              <View style={styles.info}>
                <Text style={[styles.name, styles.label]}>{name.toUpperCase()}</Text>
                <Amount coin={coin} value={balance} style={[styles.text, styles.amount]} />
                <Amount
                  coin={currency}
                  value={balance / (currencies[coin] / SATOSHI)}
                  style={[styles.label, styles.fiat]}
                />
              </View>
              <Button captionStyle={styles.menuIcon} icon="menu" onPress={onPress} raised style={styles.menu} />
            </View>
            <View style={STYLE.ROW}>
              <Icon value={trend > 0 ? 'trendingUp' : 'trendingDown'} style={styles.trend} />
              <Text style={styles.label}>{`${trend.toFixed(2)}%`}</Text>
              <View style={styles.tags}>
                { readOnly && <View style={styles.tag}><Text style={styles.tagLabel}>{i18n.READ_ONLY}</Text></View> }
                { type === TYPE.PRO &&
                  <View style={[styles.tag, styles.pro]}><Text style={styles.tagLabel}>PRO</Text></View> }
              </View>
            </View>
          </View>
          :
          <View style={[STYLE.CENTERED, styles.options]}>
            <Text style={[styles.name, styles.highlight]}>{i18n.NEW_WALLET}</Text>
            <View style={[STYLE.ROW]}>
              <WalletOption caption={i18n.CREATE} onPress={onOption} type={TYPE.CREATE} />
              <WalletOption caption={i18n.IMPORT} onPress={onOption} type={TYPE.IMPORT} />
              <WalletOption caption={i18n.RECOVER} onPress={onOption} type={TYPE.RECOVER} />
            </View>
          </View>
      }
    </Motion>
  );
};

WalletItem.propTypes = {
  currencies: shape(SHAPE.CURRENCIES),
  data: shape(SHAPE.WALLET),
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onOption: func,
  onPress: func,
  style: oneOfType([array, number]),
};

WalletItem.defaultProps = {
  currencies: {},
  data: undefined,
  onOption: undefined,
  onPress: undefined,
  style: [],
};

const mapStateToProps = ({ currencies, device, i18n }) => ({
  currencies: currencies[device.currency],
  device,
  i18n,
});

export default connect(mapStateToProps)(WalletItem);
