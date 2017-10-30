import { func, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount, Header, Input } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import styles from './AmountTransaction.style';

const { TYPE: { REQUEST } } = C;

class AmountTransaction extends Component {
  constructor(props) {
    super(props);
    const { item: { amount }, type } = props;

    this.state = {
      amount,
      concept: type,
      swap: false,
    };
    this._onAmount = this._onAmount.bind(this);
    this._onSwap = this._onSwap.bind(this);
  }

  _onAmount(amount = 0) {
    const { props: { coin, currencies, onAmount }, state: { swap } } = this;
    onAmount(swap ? amount * currencies[coin] : amount);
    this.setState({ amount, fee: undefined });
  }

  _onSwap() {
    this.setState({ amount: undefined, swap: !this.state.swap });
  }

  render() {
    const {
      _onAmount, _onSwap,
      props: { coin, currencies, device: { currency }, item, navigation, wallet: { balance } },
      state: { amount, swap },
    } = this;
    const from = swap ? currency : coin;
    const to = swap ? coin : currency;
    const conversion = swap ? (amount || 0) * currencies[coin] : (amount || 0) / currencies[coin];
    const editable = !item || !item.id;

    return (
      <View style={STYLE.LAYOUT_TOP}>
        <Header
          title="Transaction"
          navigation={navigation}
          buttonRight={editable ? { icon: 'swap', onPress: _onSwap } : undefined}
        />
        <Animatable animation="bounceIn" delay={600} style={styles.preview}>
          <View style={[STYLE.CENTERED, styles.preview]}>
            <Text style={[styles.label]}>{from}</Text>
            <Input
              _autoFocus={!amount}
              editable={editable}
              highlight
              keyboardType="numeric"
              onChangeText={(_onAmount)}
              placeholder="0.00"
              style={styles.input}
              value={amount && amount.toString()}
            />
            <Amount fixed={swap && to === 'BTC' ? 6 : 2} symbol={to} value={conversion} style={[styles.label]} />
            <View style={styles.balance}>
              <Amount
                caption="Balance "
                symbol={coin}
                style={[styles.label, styles.small]}
                value={balance}
              />
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
  item: SHAPE.TRANSACTION,
  navigation: SHAPE.NAVIGATION,
  onAmount: func,
  type: string,
  wallet: SHAPE.WALLET,
};

AmountTransaction.defaultProps = {
  coin: undefined,
  currencies: {},
  device: {},
  editable: true,
  item: {},
  navigation: undefined,
  onAmount() {},
  type: REQUEST,
  wallet: {},
};

const mapStateToProps = ({ currencies, device }) => ({ currencies, device });

export default connect(mapStateToProps)(AmountTransaction);
