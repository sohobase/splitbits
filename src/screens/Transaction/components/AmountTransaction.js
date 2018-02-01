import { LinearGradient } from 'expo';
import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import { Amount, Header, Input } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import Fees from './Fees';
import styles from './AmountTransaction.style';

const { SATOSHI, STATE: { REQUESTED }, TYPE: { SEND } } = C;
const { COLOR } = THEME;

class AmountTransaction extends Component {
  constructor(props) {
    super(props);
    const { item = {} } = props;

    this.state = {
      amount: item.amount,
      swap: false,
    };
    this._onAmount = this._onAmount.bind(this);
    this._onSwap = this._onSwap.bind(this);
  }

  _onAmount(amount = 0) {
    const {
      props: { currencies, onAmount, wallet: { coin } },
      state: { swap },
    } = this;
    onAmount(swap ? amount * currencies[coin] : amount);
    this.setState({ amount });
  }

  _onSwap() {
    this.setState({ amount: undefined, swap: !this.state.swap });
  }

  render() {
    const {
      _onAmount, _onSwap,
      props: {
        currencies, editable, fee, i18n, item = {}, navigation, onFee, type, wallet,
        device: { currency },
      },
      state: { amount, swap },
    } = this;
    const { balance, coin } = wallet;
    const {
      payment = false, state, from = {}, to = {},
    } = item;

    const conversion = editable // eslint-disable-line
      ? (swap ? ((amount || 0) / SATOSHI) * currencies[coin] : (amount || 0) / currencies[coin])
      : (amount * SATOSHI) / currencies[coin];

    let title = i18n.TRANSACTION;
    if (state) {
      title = payment ? i18n.PAYMENT : i18n.DEPOSIT;
      if (state === REQUESTED) title = i18n.PAYMENT_REQUEST;
      if (from.device === to.device) title = i18n.TRANSFER;
    }

    return (
      <LinearGradient colors={COLOR.GRADIENT} style={STYLE.LAYOUT_TOP}>
        <Header
          buttonRight={editable ? { icon: 'swap', onPress: _onSwap } : undefined}
          title={title}
          navigation={navigation}
        />
        <Motion animation="bounceIn" delay={400} style={styles.preview}>
          <View style={[STYLE.CENTERED, styles.preview]}>
            { editable && <Text style={styles.label}>{swap ? currency : coin}</Text> }
            { editable
              ? <Input
                autoFocus={editable}
                highlight
                keyboardType="numeric"
                onChangeText={_onAmount}
                placeholder="0.00"
                style={styles.input}
                value={amount && amount.toString()}
              />
              : <Amount coin={coin} style={styles.input} value={amount} />
            }
            <Amount coin={swap ? coin : currency} value={conversion} style={styles.label} />

            { editable && type === SEND &&
              <Fees
                active={fee}
                amount={parseInt((swap ? amount * currencies[coin] : amount) / SATOSHI, 10)}
                conversion={currencies[coin]}
                currency={currency}
                onPress={onFee}
                wallet={wallet}
              /> }

            <View style={styles.balance}>
              {
                state === undefined || state === REQUESTED
                ?
                  <Amount
                    caption={`${i18n.BALANCE} `}
                    coin={coin}
                    style={[styles.label, styles.small]}
                    value={balance}
                  />
                :
                  <Amount
                    caption={`${i18n.FEE} `}
                    coin={currency}
                    style={[styles.label, styles.small]}
                    value={((item.fee + item.charge) * SATOSHI) / currencies[coin]}
                  />
              }
            </View>
          </View>
        </Motion>
      </LinearGradient>
    );
  }
}

AmountTransaction.propTypes = {
  currencies: shape(SHAPE.CURRENCIES).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  editable: bool,
  fee: string,
  i18n: shape(SHAPE.I18N).isRequired,
  item: shape(SHAPE.TRANSACTION),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  onAmount: func,
  onFee: func,
  type: string.isRequired,
  wallet: shape(SHAPE.WALLET).isRequired,
};

AmountTransaction.defaultProps = {
  editable: true,
  fee: undefined,
  item: undefined,
  onAmount() {},
  onFee() {},
};

const mapStateToProps = ({ currencies, device, i18n }) => ({
  currencies: currencies[device.currency],
  device,
  i18n,
});

export default connect(mapStateToProps)(AmountTransaction);
