import { func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Avatar, Icon, Touchable } from '../../../components';
import { C, SHAPE, STYLE, TEXT } from '../../../config';
import { DateService } from '../../../services';
import styles from './TransactionItem.style';

const { MIN_CONFIRMATIONS, STATE: { CONFIRMED, REQUESTED }, SATOSHI } = C;
const {
  CURRENCIES, DEVICE, TRANSACTION, WALLET,
} = SHAPE;
const { EN: { PAY, REQUEST, TO } } = TEXT;

const verboseTitle = ({
  emitter, concept, other: { name = '' }, state, payment,
}) => {
  if (!name) return concept;
  if (state === REQUESTED) return `${emitter ? PAY : REQUEST} ${TO} ${name.split(' ')[0]}`;
  return `${payment ? 'To' : 'From'} ${name}`;
};

const TransactionItem = (props) => {
  const {
    currencies,
    data: transactionData,
    device: { currency, devices },
    onPress,
    wallet: { address } = {},
  } = props;
  const {
    amount, confirmations = 0, coin, createdAt, payment, state, from = {}, to = {},
  } = transactionData;

  const other = devices.find(({ id }) => id === from.device || id === to.device) || {};
  const symbol = payment ? '-' : '+';
  const emitter = address !== to.address;
  const concept = transactionData.concept || (payment ? 'Unknown payment' : 'Unknown top-up');

  let icon = 'operations';
  if ([CONFIRMED, REQUESTED].includes(state)) icon = (payment || emitter) ? 'arrowForward' : 'arrowBack';

  return (
    <Touchable onPress={() => onPress(payment)} activeOpacity={0.95}>
      <View style={[STYLE.ROW, STYLE.LIST_ITEM, styles.container]}>
        <View>
          <Avatar value={other.image} />
          <View style={[styles.icon, styles.iconLayout, (confirmations < MIN_CONFIRMATIONS && styles.iconAlert)]}>
            <Icon value={icon} style={[styles.iconLayout, styles.iconColor]} />
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            {verboseTitle({
              emitter, concept, other, state, payment,
            })}
          </Text>
          <Text style={[styles.label, styles.date]}>{DateService.ago(createdAt)}</Text>
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
  currencies: shape(CURRENCIES).isRequired,
  data: shape(TRANSACTION).isRequired,
  device: shape(DEVICE).isRequired,
  onPress: func,
  wallet: shape(WALLET).isRequired,
};

TransactionItem.defaultProps = {
  onPress() {},
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies: currencies[device.currency],
  device,
});

export default connect(mapStateToProps)(TransactionItem);
