import { bool } from 'prop-types';
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Button, Header } from '../../components';
import { SHAPE, STYLE } from '../../config';
import styles from './Transaction.style';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: undefined,
      fee: 22000 / 10000000,
      swap: false,
    };
    this._onAmount = this._onAmount.bind(this);
    this._onSwap = this._onSwap.bind(this);
  }

  _onAmount(amount) {
    this.setState({ amount });
  }

  _onSwap() {
    this.setState({ swap: !this.state.swap });
  }

  render() {
    const {
      _onAmount,
      _onSwap,
      props: { currencies, device: { currency }, navigation, wallet: { coin = 'LTC' } },
      state: { amount, fee, swap },
    } = this;
    const from = swap ? currency : coin;
    const to = swap ? coin : currency;
    const conversion = swap ? (amount || 0) * currencies[coin] : (amount || 0) / currencies[coin];

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header title="Transaction" navigation={navigation} buttonRight={{ icon: 'swap', onPress: _onSwap }} />
          <View style={[STYLE.CENTERED, styles.preview]}>
            <Text style={[styles.label]}>{from}</Text>
            <TextInput
              autoFocus={!amount || amount.length === 0}
              keyboardType="numeric"
              onChangeText={(_onAmount)}
              placeholder="0.00"
              style={[STYLE.INPUT, STYLE.INPUT_HIGHLIGHT, styles.amount]}
              value={amount && amount.toString()}
            />
            <Amount symbol={to} value={conversion} style={[styles.label]} />
            <View style={[STYLE.ROW, styles.fee]}>
              <Text style={[styles.label, styles.small]}>Fee is </Text>
              <Amount symbol={currency} value={fee / currencies[coin]} style={[styles.label, styles.small]} />
            </View>
          </View>
        </View>
        <View style={STYLE.LAYOUT_BOTTOM}>
          <Button accent caption="Create transaction" style={styles.button} />
        </View>
      </View>
    );
  }
}

Transaction.propTypes = {
  currencies: SHAPE.CURRENCIES,
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
  readMode: bool,
  wallet: SHAPE.WALLET,
};

Transaction.defaultProps = {
  currencies: {},
  device: {},
  navigation: undefined,
  readMode: false,
  wallet: {},
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies,
  device,
});

// const mapDispatchToProps = dispatch => ({
//   updateDevice: device => dispatch(updateDeviceAction(device)),
// });

export default connect(mapStateToProps)(Transaction);
