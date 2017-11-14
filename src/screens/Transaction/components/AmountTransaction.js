import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount, Header, Input } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import styles from './AmountTransaction.style';

const { SATOSHI, STATE: { REQUESTED } } = C;

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
        item: { charge = 0, fee, payment = false, state } = {},
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
    let title = 'Transaction';
    if (state) {
      title = payment ? 'Payment' : 'Deposit';
      if (state === REQUESTED) title = `${title} Request`;
    }

    return (
      <View style={STYLE.LAYOUT_TOP}>
        <Header
          title={title}
          navigation={navigation}
          buttonRight={editable ? { icon: 'swap', onPress: _onSwap } : undefined}
        />
        <Animatable animation="bounceIn" delay={600} style={styles.preview}>
          <View style={[STYLE.CENTERED, styles.preview]}>
            <Text style={[styles.label]}>{from}</Text>
            { editable
              ? <Input
                autoFocus={!amount}
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
              { editable
                ? <Amount caption="Balance " coin={coin} style={[styles.label, styles.small]} value={balance} />
                : <Amount
                  caption="Fee "
                  coin={to}
                  style={[styles.label, styles.small]}
                  value={((fee + charge) * SATOSHI) / currencies[coin]}
                /> }
            </View>
          </View>
        </Animatable>
      </View>
    );
  }
}

AmountTransaction.propTypes = {
  coin: string,
  currencies: SHAPE.CURRENCIES,
  device: SHAPE.DEVICE,
  editable: bool,
  item: SHAPE.TRANSACTION,
  navigation: SHAPE.NAVIGATION,
  onAmount: func,
  wallet: SHAPE.WALLET,
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

const mapStateToProps = ({ currencies, device }) => ({ currencies, device });

export default connect(mapStateToProps)(AmountTransaction);
