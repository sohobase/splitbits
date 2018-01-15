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
  currencies,
  data: {
    balance = 0, coin, id, name = '', readOnly, trend = 0, type,
  } = {},
  device: { currency },
  i18n,
  onPress,
  style,
}) => {
  return (
    <Motion
      animation="bounceIn"
      delay={300}
      duration={DURATION}
      style={[STYLE.ELEVATION, styles.container, (!id ? styles.empty : undefined), style]}
    >
      {
        id ?
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
              <WalletOption caption={i18n.CREATE} onPress={onPress} type={TYPE.CREATE} />
              <WalletOption caption={i18n.IMPORT} onPress={onPress} type={TYPE.IMPORT} />
              <WalletOption caption={i18n.RECOVER} onPress={onPress} type={TYPE.RECOVER} />
            </View>
          </View>
      }
    </Motion>
  );
};

WalletItem.propTypes = {
  currencies: shape(SHAPE.CURRENCIES),
  data: shape(SHAPE.WALLET).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onPress: func,
  style: oneOfType([array, number]),
};

WalletItem.defaultProps = {
  currencies: {},
  onPress: undefined,
  style: [],
};

const mapStateToProps = ({ currencies, device, i18n }) => ({
  currencies: currencies[device.currency],
  device,
  i18n,
});

export default connect(mapStateToProps)(WalletItem);
