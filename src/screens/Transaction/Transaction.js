import { func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View as Motion } from 'react-native-animatable';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, QRreader } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { ConnectionService, TransactionService } from '../../services';
import { selectDeviceAction, updateTransactionsAction } from '../../store/actions';
import { AmountTransaction, ButtonSubmit, Recipient, Info } from './components';
import { submit } from './modules';
import styles from './Transaction.style';

const {
  CONNECTION: { WIFI }, SATOSHI, STATE: { REQUESTED }, TYPE: { SEND, REQUEST },
} = C;
const {
  CURRENCIES, DEVICE, NAVIGATION, TRANSACTION, WALLET,
} = SHAPE;
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
      connection: undefined,
      fees: {},
      processing: false,
    };
    this._onAddress = this._onAddress.bind(this);
    this._onAmount = this._onAmount.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onConcept = this._onConcept.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._updateFees = this._updateFees.bind(this);
  }

  async componentWillMount() {
    const { _updateFees, props: { selectDevice, item: { amount, state, to } = {}, wallet } } = this;
    selectDevice(undefined);
    if (state === REQUESTED && wallet.address !== to.address) _updateFees(amount);
    this.setState({ connection: await ConnectionService.get() });
  }

  _onAddress(address) {
    this.props.selectDevice(undefined);
    // @TODO validate address
    this.setState({ address, camera: false }); //eslint-disable-line
  }

  _onAmount(amount) {
    const { _updateFees, props: { type } } = this;
    this.setState({ amount, fees: {} });
    clearTimeout(timeout);

    if (type === SEND && amount > 0) {
      timeout = setTimeout(() => _updateFees(Math.round(amount / SATOSHI)), 300);
    }
  }

  _onCamera() {
    this.props.selectDevice(undefined);
    this.setState({ camera: !this.state.camera });
  }

  _onConcept(concept) {
    this.setState({ concept });
  }

  async _updateFees(amount) {
    const { wallet: { balance, id } } = this.props;
    if (balance > 0) this.setState({ fees: await TransactionService.fees(id, amount) });
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
        currencies, device: { currency }, deviceId, i18n, item, navigation, type, wallet,
      },
      state: {
        amount = 0, address, camera, concept, connection, fees = {}, processing,
      },
    } = this;
    const { coin } = wallet;
    const editable = !item;
    const fee = fees.total;
    const amountProps = {
      coin, editable, item, navigation, wallet,
    };
    const recipientProps = {
      concept, deviceId, navigation, type, address,
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
            <Motion animation="bounceIn" style={styles.centered}>
              <Amount
                caption={`${i18n.FEE} `}
                coin={currency}
                value={(fee * SATOSHI) / currencies[currency][coin]}
                style={styles.caption}
              />
            </Motion> }
          { editable && connection === WIFI &&
            <Motion animation="bounceIn" delay={700} style={styles.centered}>
              <Text style={[styles.caption, styles.error]}>{i18n.UNSECURED_CONNECTION}</Text>
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
  i18n: shape({}).isRequired,
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

const mapStateToProps = ({
  currencies, device, i18n, selectedDevice,
}, props) => {
  const { item, type = REQUEST, wallet = {} } = props.navigation.state.params;

  return {
    currencies, device, deviceId: selectedDevice, i18n, item, type, wallet,
  };
};

const mapDispatchToProps = dispatch => ({
  selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
