import { string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Amount, Button, Header, Input } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { TransactionService } from '../../services';
import { Recipient, Info } from './components';
import styles from './Transaction.style';

const { SATOSHI, TYPE: { REQUEST, SEND } } = C;
let timeout;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item: { amount, fee }, type } = props;

    this.state = {
      amount,
      address: undefined,
      concept: type,
      deviceId: undefined,
      fee,
      swap: false,
    };
    this._onAmount = this._onAmount.bind(this);
    this._onDevice = this._onDevice.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onSwap = this._onSwap.bind(this);
  }

  _onAddress(address) {
    this.setState({ address, deviceId: undefined });
  }

  _onAmount(amount) {
    this.setState({ amount, fee: undefined });
    if (amount > 0) {
      const { currencies, wallet: { coin } } = this.props;
      clearTimeout(timeout);
      timeout = setTimeout(async() => {
        const fees = await TransactionService.fee(coin, amount / SATOSHI);
        if (fees && fees.default > 0) this.setState({ fee: ((fees.default + fees.charge) * SATOSHI) / currencies[coin] });
      }, 1000);
    }
  }

  _onDevice(deviceId) {
    this.setState({ address: undefined, deviceId });
  }

  async _onSubmit() {
    const { item: { id }, navigation, type, wallet: { coin, id: walletId, wif } } = this.props;
    const isRequest = type === REQUEST;
    const method = isRequest ? 'request' : 'send';

    await TransactionService[method]({ ...this.state, id, coin, walletId, wif: (!isRequest ? wif : undefined) });
    navigation.goBack();
  }

  _onSwap() {
    this.setState({ amount: undefined, swap: !this.state.swap });
  }

  render() {
    const {
      _onAddress, _onAmount, _onDevice, _onSubmit, _onSwap,
      props: { currencies, device: { currency }, item, navigation, type, wallet },
      state: { address, amount, deviceId, fee, swap },
    } = this;
    const coin = item.coin || wallet.coin;
    const from = swap ? currency : coin;
    const to = swap ? coin : currency;
    const conversion = swap ? (amount || 0) * currencies[coin] : (amount || 0) / currencies[coin];
    const editable = !item || !item.id;

    console.log('fee', fee);
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
              <Input
                autoFocus={!amount}
                editable={editable}
                highlight
                keyboardType="numeric"
                onChangeText={(_onAmount)}
                placeholder="0.00"
                style={styles.input}
                value={amount && amount.toString()}
              />
              <Amount fixed={swap && to === 'BTC' ? 6 : 2} symbol={to} value={conversion} style={[styles.label]} />
              { fee &&
                <Animatable animation="bounceIn" style={styles.fee}>
                  <Amount caption="Fee is " symbol={currency} value={fee} style={[styles.label, styles.small]} />
                </Animatable>
              }
            </View>
          </Animatable>
        </View>
        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          { editable
            ? <Recipient onItem={_onDevice} onAdress={_onAddress} selected={deviceId} />
            : <Info item={item} />
          }
          { (type === REQUEST || type === SEND) &&
            <Button
              accent
              caption={`${type} ${amount || 0}`}
              disabled={!(amount > 0 && amount <= wallet.balance && (deviceId || address))}
              onPress={_onSubmit}
              style={styles.button}
            />
          }
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
  type: string,
  wallet: SHAPE.WALLET,
};

Transaction.defaultProps = {
  currencies: {},
  device: {},
  item: {},
  navigation: undefined,
  type: REQUEST,
  wallet: {},
};

const mapStateToProps = ({ currencies, device }, props) => {
  const { item = {}, type = REQUEST, wallet = {} } = props.navigation.state.params;

  console.log('type', type);
  return { currencies, device, item, type, wallet };
};

// const mapDispatchToProps = dispatch => ({
//   updateDevice: device => dispatch(updateDeviceAction(device)),
// });

export default connect(mapStateToProps)(Transaction);
