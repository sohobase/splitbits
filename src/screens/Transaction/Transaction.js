import { func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View as Motion } from 'react-native-animatable';
import { View } from 'react-native';
import { connect } from 'react-redux';
import BitcoinJS from 'bitcoinjs-lib';
import { Amount, Button, QRreader } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { TransactionService } from '../../services';
import { selectDeviceAction, updateTransactionsAction } from '../../store/actions';
import { AmountTransaction, Recipient, Info } from './components';
import styles from './Transaction.style';

const { SATOSHI, STATE: { REQUESTED }, TYPE: { PRO, REQUEST } } = C;
const {
  CURRENCIES, DEVICE, NAVIGATION, TRANSACTION, WALLET,
} = SHAPE;
let timeout;

const getWif = hexSeed => BitcoinJS.HDNode.fromSeedHex(hexSeed).keyPair.toWIF();

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
    this._onCancel = this._onCancel.bind(this);
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
      props: {
        deviceId, navigation, type, updateTransactions,
        item: { id } = {},
        wallet: {
          coin,
          wif,
          hexSeed,
          id: walletId,
        },
      },
      state: { address, amount, concept },
    } = this;
    const isRequest = type === REQUEST;
    const method = isRequest ? 'request' : 'send';
    const params = {
      address,
      amount: parseInt(amount / SATOSHI, 10),
      coin,
      concept,
      deviceId,
      id,
      walletId,
      wif: (!isRequest ? wif || getWif(hexSeed) : undefined),
    };

    const transaction = await TransactionService[method](params);
    if (transaction && transaction.id) {
      updateTransactions(transaction);
      navigation.goBack();
    }
  }

  async _onCancel() {
    const {
      item: { id }, navigation, updateTransactions, wallet,
    } = this.props;

    const transaction = await TransactionService.cancelRequest(id, wallet.id);
    if (transaction && transaction.id) {
      updateTransactions(transaction);
      navigation.goBack();
    }
  }

  render() {
    const {
      _onAddress, _onAmount, _onCancel, _onCamera, _onConcept, _onSubmit,
      props: {
        currencies, device: { currency }, deviceId, item, navigation, type, wallet,
      },
      state: {
        address, amount = 0, camera, concept, fees = {},
      },
    } = this;
    const { balance, coin } = wallet;
    const editable = !item;
    const checked = amount > 0 && amount <= balance && concept && (deviceId || address);
    const fee = wallet.type === PRO ? fees.average : fees.slow + fees.charge;
    const amountProps = {
      coin, editable, item, navigation, wallet,
    };
    const recipientProps = {
      concept, deviceId, navigation, type,
    };

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
            </Button> }
          { item && item.state === REQUESTED &&
            <Motion animation="bounceInUp" delay={600}>
              { wallet.address !== item.to.address
                ? // @TODO: Accept a request
                  <Button accent disabled={balance <= item.amount} _onPress={_onSubmit} style={styles.button}>
                    <Amount caption="Send " coin={coin} style={styles.buttonCaption} value={item.amount} />
                  </Button>
                :
                  <Button accent caption="Cancel request" onPress={_onCancel} style={styles.button} /> }
            </Motion> }
          { fee > 0 &&
            <Motion animation="bounceIn" style={styles.fee}>
              <Amount
                caption="Included fee "
                coin={currency}
                value={fee * currencies[coin]}
                style={styles.feeCaption}
              />
            </Motion> }
        </View>
        <QRreader active={camera} onClose={_onCamera} onRead={_onAddress} />
      </View>
    );
  }
}

Transaction.propTypes = {
  currencies: shape(CURRENCIES),
  device: shape(DEVICE),
  deviceId: string,
  item: shape(TRANSACTION),
  navigation: shape(NAVIGATION),
  selectDevice: func,
  type: string,
  updateTransactions: func,
  wallet: shape(WALLET),
};

Transaction.defaultProps = {
  currencies: {},
  device: undefined,
  deviceId: undefined,
  item: undefined,
  navigation: undefined,
  selectDevice() {},
  type: REQUEST,
  updateTransactions() {},
  wallet: {},
};

const mapStateToProps = ({ currencies, device, selectedDevice }, props) => {
  const { item, type = REQUEST, wallet = {} } = props.navigation.state.params;

  return {
    currencies, device, deviceId: selectedDevice, item, type, wallet,
  };
};

const mapDispatchToProps = dispatch => ({
  selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
