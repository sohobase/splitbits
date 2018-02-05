import { func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Amount, Avatar, Icon, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { DateService } from '../../../services';
import styles from './TransactionItem.style';

const {
  MIN_CONFIRMATIONS, SATOSHI, STATE: { CONFIRMED, REQUESTED }, SUPPORT_WALLET,
} = C;

const verboseTitle = ({
  emitter, concept, i18n, isTransfer, other: { name = '' }, state, payment,
}) => {
  if (isTransfer) return i18n.TRANSFER;
  if (!name) return concept;
  if (state === REQUESTED) return `${emitter ? i18n.PAY : i18n.REQUEST} ${i18n.TO} ${name.split(' ')[0]}`;
  return `${payment ? i18n.TO : i18n.FROM} ${name}`;
};

const TransactionItem = ({
  currencies,
  data,
  device,
  i18n,
  onPress,
  wallet: { address } = {},
}) => {
  const { currency, devices } = device;
  const {
    amount, confirmations = 0, coin, createdAt, payment, state, from = {}, to = {},
  } = data;
  const isTransfer = from.device === to.device;
  let other = isTransfer
    ? device
    : (devices.find(({ id }) => id === from.device || id === to.device) || {});
  if (SUPPORT_WALLET.ADDRESS[coin] === to.address) other = SUPPORT_WALLET;

  const emitter = address !== to.address;
  const concept = data.concept || (payment ? 'Unknown payment' : 'Unknown top-up');

  let icon = 'operations';
  if ([CONFIRMED, REQUESTED].includes(state) && !isTransfer) icon = (payment || emitter) ? 'arrowForward' : 'arrowBack';

  return (
    <Touchable onPress={() => onPress(payment)}>
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
              concept, emitter, i18n, isTransfer, other, payment, state,
            })}
          </Text>
          <Text style={[styles.label, styles.date]}>{DateService.ago(createdAt)}</Text>
          { other.name && <Text style={[styles.label]}>{concept}</Text> }
        </View>
        <View style={styles.amounts}>
          <Amount
            coin={coin}
            value={(payment ? -1 : 1) * amount}
            style={[styles.amount]}
            symbol
          />
          <Amount
            coin={currency}
            value={(payment ? -1 : 1) * (amount / (currencies[coin] / SATOSHI))}
            style={[styles.label, styles.fiat]}
            symbol
          />
        </View>
      </View>
    </Touchable>
  );
};

TransactionItem.propTypes = {
  currencies: shape(SHAPE.CURRENCIES).isRequired,
  data: shape(SHAPE.TRANSACTION).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onPress: func,
  wallet: shape(SHAPE.WALLET).isRequired,
};

TransactionItem.defaultProps = {
  onPress() {},
};

const mapStateToProps = ({ currencies, device, i18n }) => ({
  currencies: currencies[device.currency],
  device,
  i18n,
});

export default connect(mapStateToProps)(TransactionItem);
