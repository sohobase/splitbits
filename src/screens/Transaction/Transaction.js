import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount, Button, Header } from '../../components';
import { SHAPE, STYLE } from '../../config';
import { Devices, Info } from './components';
import styles from './Transaction.style';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.item.amount,
      fee: 22000 / 100000000,
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
      props: { currencies, device: { currency }, item, navigation, wallet },
      state: { amount, fee, swap },
    } = this;
    const coin = item.coin || wallet.coin;
    const from = swap ? currency : coin;
    const to = swap ? coin : currency;
    const conversion = swap ? (amount || 0) * currencies[coin] : (amount || 0) / currencies[coin];
    const editable = !item || !item.id;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header
            title="Transaction"
            navigation={navigation}
            buttonRight={editable ? { icon: 'swap', onPress: _onSwap } : undefined}
          />
          <Animatable animation="bounceIn" delay={600} style={styles.preview}>
            <View style={[STYLE.CENTERED, styles.preview]}>
              <Text style={[styles.label]}>{from}</Text>
              <TextInput
                autoFocus={!amount}
                editable={editable}
                keyboardType="numeric"
                onChangeText={(_onAmount)}
                placeholder="0.00"
                style={[STYLE.INPUT, STYLE.INPUT_HIGHLIGHT, styles.amount]}
                value={amount && amount.toString()}
              />
              <Amount fixed={swap && to === 'BTC' ? 6 : 2} symbol={to} value={conversion} style={[styles.label]} />

              <View style={styles.fee}>
                <Amount caption="Fee is " symbol={currency} value={fee / currencies[coin]} style={[styles.label, styles.small]} />
              </View>
            </View>
          </Animatable>
        </View>
        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          { editable ? <Devices /> : <Info item={item} /> }
          <Button
            accent
            caption="Request $0.00"
            disabled={amount > wallet.balance}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

Transaction.propTypes = {
  currencies: SHAPE.CURRENCIES,
  device: SHAPE.DEVICE,
  item: SHAPE.TRANSACTION,
  navigation: SHAPE.NAVIGATION,
  wallet: SHAPE.WALLET,
};

Transaction.defaultProps = {
  currencies: {},
  device: {},
  item: {},
  navigation: undefined,
  wallet: {},
};

const mapStateToProps = ({ currencies, device }, props) => {
  const { item = {}, wallet = {} } = props.navigation.state.params;

  return { currencies, device, item, wallet };
};

// const mapDispatchToProps = dispatch => ({
//   updateDevice: device => dispatch(updateDeviceAction(device)),
// });

export default connect(mapStateToProps)(Transaction);
