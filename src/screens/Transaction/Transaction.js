import { func, string } from 'prop-types';
import React, { Component } from 'react';
import { View as Animatable } from 'react-native-animatable';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Button, QRreader } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { TransactionService } from '../../services';
import { selectDeviceAction } from '../../store/actions';
import { AmountTransaction, Recipient, Info } from './components';
import styles from './Transaction.style';

const { SATOSHI, TYPE: { PRO, REQUEST, SEND } } = C;
let timeout;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item = {} } = props;

    this.state = {
      amount: item.amount,
      address: undefined,
      camera: false,
      concept: undefined,
      fees: {},
    };
    this._onAddress = this._onAddress.bind(this);
    this._onAmount = this._onAmount.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onConcept = this._onConcept.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.selectDevice(undefined);
  }

  _onAddress(address) {
    this.props.selectDevice(undefined);
    this.setState({ address });
  }

  _onAmount(amount) {
    this.setState({ amount });
    clearTimeout(timeout);

    if (amount > 0) {
      timeout = setTimeout(async() => {
        const { wallet: { coin } } = this.props;
        this.setState({ fees: await TransactionService.fees(coin, amount * SATOSHI) });
      }, 300);
    } else {
      this.setState({ fees: {} });
    }
  }

  _onCamera() {
    this.props.selectDevice(undefined);
    this.setState({ camera: !this.state.camera });
  }

  _onConcept(concept) {
    this.setState({ concept });
  }

  async _onSubmit() {
    const {
      props: { deviceId, item: { id }, navigation, type, wallet: { coin, id: walletId, wif } },
      state: { address, amount, concept },
    } = this;
    const isRequest = type === REQUEST;
    const params = { address, amount, coin, concept, deviceId, id, walletId };

    await TransactionService[isRequest ? 'request' : 'send']({ ...params, wif: (!isRequest ? wif : undefined) });
    navigation.goBack();
  }

  render() {
    const {
      _onAddress, _onAmount, _onCamera, _onConcept, _onSubmit,
      props: { currencies, deviceId, item, navigation, type, wallet },
      state: { address, amount = 0, camera, concept, fees = {} },
    } = this;
    const { balance, coin } = wallet;
    const editable = !item;
    const checked = amount > 0 && amount <= balance && concept && (deviceId || address);
    const fee = wallet.type === PRO ? fees.average : fees.slow + fees.charge;
    const amountProps = { coin, editable, item, navigation, wallet };
    const recipientProps = { concept, deviceId, navigation, type };

    return (
      <View style={STYLE.SCREEN}>
        <AmountTransaction {...amountProps} onAmount={_onAmount} />
        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          { editable
            ? <Recipient {...recipientProps} onCamera={_onCamera} onConcept={_onConcept} />
            : <Info item={item} /> }
          { editable &&
            <Button accent disabled={!checked} onPress={_onSubmit} style={styles.button}>
              <Amount caption={`${type} `} coin={coin} style={styles.buttonCaption} value={amount / SATOSHI} />
            </Button>
          }
          { editable && fee > 0 &&
            <Animatable animation="bounceIn" style={styles.fee}>
              <Amount caption="Included fee " coin='USD' value={fee * currencies[coin]} style={styles.feeCaption} />
            </Animatable>
          }
        </View>
        <QRreader active={camera} onClose={_onCamera} onRead={_onAddress} />
      </View>
    );
  }
}

Transaction.propTypes = {
  currencies: SHAPE.CURRENCIES,
  deviceId: string,
  item: SHAPE.TRANSACTION,
  navigation: SHAPE.NAVIGATION,
  selectDevice: func,
  type: string,
  wallet: SHAPE.WALLET,
};

Transaction.defaultProps = {
  currencies: {},
  deviceId: undefined,
  item: undefined,
  navigation: undefined,
  selectDevice() {},
  type: REQUEST,
  wallet: {},
};

const mapStateToProps = ({ currencies, selectedDevice }, props) => {
  const { item, type = REQUEST, wallet = {} } = props.navigation.state.params;

  return { currencies, deviceId: selectedDevice, item, type, wallet };
};

const mapDispatchToProps = dispatch => ({
  selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
