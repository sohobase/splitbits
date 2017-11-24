import { func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View as Motion } from 'react-native-animatable';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, QRreader } from '../../components';
import { C, SHAPE, STYLE, TEXT } from '../../config';
import { TransactionService } from '../../services';
import { selectDeviceAction, updateTransactionsAction } from '../../store/actions';
import { AmountTransaction, ButtonSubmit, Recipient, Info } from './components';
import { submit } from './modules';
import styles from './Transaction.style';

const { SATOSHI, STATE: { REQUESTED }, TYPE: { SEND, PRO, REQUEST } } = C;
const {
  CURRENCIES, DEVICE, NAVIGATION, TRANSACTION, WALLET,
} = SHAPE;
const { EN: { FEE } } = TEXT;
let timeout;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item = {} } = props;

    this.state = {
      amount: item.amount,
      address: undefined, //eslint-disable-line
      camera: false,
      concept: undefined,
      fees: {},
      processing: false,
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
    // @TODO validate address
    this.setState({ address, camera: false }); //eslint-disable-line
  }

  _onAmount(amount) {
    const { type, wallet: { coin } } = this.props;
    this.setState({ amount, fees: {} });
    clearTimeout(timeout);

    if (type === SEND && amount > 0) {
      timeout = setTimeout(async() => {
        this.setState({ fees: await TransactionService.fees(coin, amount * SATOSHI) });
      }, 300);
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
    this.setState({ processing: true });
    const transaction = await submit(this);
    if (transaction && transaction.id) {
      const { navigation, updateTransactions } = this.props;
      updateTransactions(transaction);
      this.setState({ processing: false });
      navigation.goBack();
    }
  }

  async _onCancel() {
    const {
      item: { id }, navigation, updateTransactions, wallet,
    } = this.props;

    const transaction = await TransactionService.archive(id, wallet.id);
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
        amount = 0, address, camera, concept, fees = {}, processing,
      },
    } = this;
    const { coin } = wallet;
    const editable = !item;
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
          { (editable || item.state === REQUESTED) &&
            <ButtonSubmit
              amount={editable ? amount / SATOSHI : item.amount}
              concept={concept}
              item={item}
              onCancel={_onCancel}
              onPress={_onSubmit}
              processing={processing}
              recipient={deviceId || address}
              type={type}
              wallet={wallet}
            /> }
          { fee > 0 &&
            <Motion animation="bounceIn" style={styles.fee}>
              <Amount
                caption={`${FEE} `}
                coin={currency}
                value={fee * currencies[currency][coin]}
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
  currencies: shape(CURRENCIES).isRequired,
  device: shape(DEVICE).isRequired,
  deviceId: string,
  item: shape(TRANSACTION),
  navigation: shape(NAVIGATION).isRequired,
  selectDevice: func.isRequired,
  type: string.isRequired,
  updateTransactions: func.isRequired,
  wallet: shape(WALLET).isRequired,
};

Transaction.defaultProps = {
  deviceId: undefined,
  item: undefined,
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
