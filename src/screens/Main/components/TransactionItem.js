import { func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Avatar, Icon, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import styles from './TransactionItem.style';

const { MIN_CONFIRMATIONS, STATE: { CONFIRMED, REQUESTED }, SATOSHI } = C;
const {
  CURRENCIES, DEVICE, TRANSACTION, WALLET,
} = SHAPE;

const verboseTitle = ({
  emitter, concept, other: { name }, state, payment,
}) => {
  if (!name) return concept;
  if (state === REQUESTED) return `Request ${emitter ? 'from' : 'to'} ${name}`;
  return `${payment ? 'To' : 'From'} ${name}`;
};

const TransactionItem = (props) => {
  const {
    currencies,
    data: {
      amount, confirmations = 0, coin, concept, createdAt, payment, state, from = {}, to = {},
    },
    device: { currency, devices },
    onPress,
    wallet: { address } = {},
  } = props;

  const other = devices.find(({ id }) => id === from.device || id === to.device) || {};
  const symbol = payment ? '-' : '+';

  let icon = 'settings';
  if (state === CONFIRMED) icon = payment ? 'arrowForward' : 'arrowBack';
  if (state === REQUESTED) icon = 'operations';

  return (
    <Touchable onPress={() => onPress(payment)} activeOpacity={0.95}>
      <View style={[STYLE.ROW, STYLE.LIST_ITEM, styles.container]}>
        <View>
          <Avatar value={other.image} />
          <Icon
            value={icon}
            style={[styles.icon, (confirmations < MIN_CONFIRMATIONS && styles.iconAlert)]}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            {verboseTitle({
              emitter: (address !== to.address), concept, other, state, payment,
            })}
          </Text>
          <Text style={[styles.label, styles.date]}>{createdAt.toString().substr(0, 10)}</Text>
          { other.name && <Text style={[styles.label]}>{concept}</Text> }
        </View>
        <View style={styles.amounts}>
          <Amount caption={symbol} coin={coin} value={amount} style={[styles.amount]} />
          <Amount
            caption={symbol}
            coin={currency}
            value={amount / (currencies[coin] / SATOSHI)}
            style={[styles.label, styles.fiat]}
          />
        </View>
      </View>
    </Touchable>
  );
};

TransactionItem.propTypes = {
  currencies: shape(CURRENCIES),
  data: shape(TRANSACTION),
  device: shape(DEVICE),
  onPress: func,
  wallet: shape(WALLET),
};

TransactionItem.defaultProps = {
  currencies: {},
  data: {},
  device: {},
  onPress: undefined,
  wallet: undefined,
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies: currencies[device.currency],
  device,
});

export default connect(mapStateToProps)(TransactionItem);
