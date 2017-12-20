import { LinearGradient } from 'expo';
import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount, Header, Input } from '../../../components';
import { C, SHAPE, STYLE, TEXT, THEME } from '../../../config';
import styles from './AmountTransaction.style';

const { SATOSHI, STATE: { REQUESTED } } = C;
const {
  CURRENCIES, DEVICE, NAVIGATION, WALLET,
} = SHAPE;
const {
  EN: {
    BALANCE, DEPOSIT, FEE, PAYMENT, PAYMENT_REQUEST, TRANSACTION,
  },
} = TEXT;
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
    const { props: { coin, currencies, onAmount }, state: { swap } } = this;
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
        coin, currencies, editable, navigation,
        device: { currency },
        item: {
          charge = 0, fee = 0, payment = false, state,
        } = {},
        wallet: { balance },
      },
      state: { amount, swap },
    } = this;
    const from = swap ? currency : coin;
    const to = swap ? coin : currency;
    let conversion;
    if (editable) {
      conversion = swap ? ((amount || 0) / SATOSHI) * currencies[coin] : (amount || 0) / currencies[coin];
    } else {
      conversion = (amount * SATOSHI) / currencies[coin];
    }
    let title = TRANSACTION;
    if (state) {
      title = payment ? PAYMENT : DEPOSIT;
      if (state === REQUESTED) title = PAYMENT_REQUEST;
    }

    return (
      <LinearGradient colors={COLOR.GRADIENT} style={[STYLE.LAYOUT_TOP, STYLE[coin]]}>
        <Header
          buttonRight={editable ? { icon: 'swap', onPress: _onSwap } : undefined}
          coin={coin}
          title={title}
          navigation={navigation}
        />
        <Motion animation="bounceIn" delay={400} style={styles.preview}>
          <View style={[STYLE.CENTERED, styles.preview]}>
            <Text style={[styles.label]}>{from}</Text>
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
            <Amount coin={to} value={conversion} style={[styles.label]} />
            <View style={styles.balance}>
              {
                state === undefined || state === REQUESTED
                ? <Amount caption={`${BALANCE} `} coin={coin} style={[styles.label, styles.small]} value={balance} />
                :
                <Amount
                  caption={`${FEE} `}
                  coin={currency}
                  style={[styles.label, styles.small]}
                  value={((fee + charge) * SATOSHI) / currencies[coin]}
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
  coin: string,
  currencies: shape(CURRENCIES),
  device: shape(DEVICE),
  editable: bool,
  item: shape(SHAPE.TRANSACTION),
  navigation: shape(NAVIGATION),
  onAmount: func,
  wallet: shape(WALLET),
};

AmountTransaction.defaultProps = {
  coin: undefined,
  currencies: {},
  device: {},
  editable: true,
  item: undefined,
  navigation: undefined,
  onAmount() {},
  wallet: {},
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies: currencies[device.currency],
  device,
});

export default connect(mapStateToProps)(AmountTransaction);
