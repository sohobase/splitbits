import { func, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Button, QRreader } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { TransactionService } from '../../services';
import { selectDeviceAction } from '../../store/actions';
import { AmountTransaction, Recipient, Info } from './components';
import styles from './Transaction.style';

const { TYPE: { REQUEST, SEND } } = C;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item: { amount, fee } } = props;

    this.state = {
      amount,
      address: undefined,
      camera: false,
      concept: undefined,
      fee,
      swap: false,
    };
    this._onAddress = this._onAddress.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onConcept = this._onConcept.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onAddress(address) {
    this.props.selectDevice(undefined);
    this.setState({ address });
  }

  _onCamera() {
    this.props.selectDevice(undefined);
    this.setState({ camera: !this.state.camera });
  }

  _onConcept(concept) {
    this.setState({ concept });
  }

  async _onSubmit() {
    const { item: { id }, navigation, type, wallet: { coin, id: walletId, wif } } = this.props;
    const isRequest = type === REQUEST;
    const method = isRequest ? 'request' : 'send';

    await TransactionService[method]({ ...this.state, id, coin, walletId, wif: (!isRequest ? wif : undefined) });
    navigation.goBack();
  }

  render() {
    const {
      _onAddress, _onCamera, _onConcept, _onSubmit,
      props: { deviceId, item, navigation, type, wallet },
      state: { address, amount = 0, camera, concept },
    } = this;
    const coin = item.coin || wallet.coin;
    const editable = !item || !item.id;
    const checked = amount > 0 && amount <= wallet.balance && concept && (deviceId || address);

    return (
      <View style={STYLE.SCREEN}>
        <AmountTransaction
          coin={coin}
          navigation={navigation}
          onAmount={value => this.setState({ amount: value })}
          wallet={wallet}
        />
        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          { editable
            ? <Recipient
              concept={concept}
              deviceId={deviceId}
              navigation={navigation}
              onCamera={_onCamera}
              onConcept={type === REQUEST ? _onConcept : undefined}
            />
            : <Info item={item} /> }
          { (type === REQUEST || type === SEND) &&
            <Button accent disabled={!checked} onPress={_onSubmit} style={styles.button}>
              <Amount symbol={coin} caption={`${type} `} value={parseFloat(amount)} />
            </Button>
          }
          <Text>Fee is skskslk</Text>
        </View>
        <QRreader active={camera} onClose={_onCamera} onRead={_onAddress} />
      </View>
    );
  }
}

Transaction.propTypes = {
  deviceId: string,
  item: SHAPE.TRANSACTION,
  navigation: SHAPE.NAVIGATION,
  selectDevice: func,
  type: string,
  wallet: SHAPE.WALLET,
};

Transaction.defaultProps = {
  deviceId: undefined,
  item: {},
  navigation: undefined,
  selectDevice() {},
  type: REQUEST,
  wallet: {},
};

const mapStateToProps = ({ selectedDevice }, props) => {
  // const { item = {}, type = REQUEST, wallet = {} } = props.navigation.state.params;

  const item = { };
  const type = REQUEST;
  const wallet = { balance: 3.3, coin: 'BTC' };

  return { deviceId: selectedDevice, item, type, wallet };
};

const mapDispatchToProps = dispatch => ({
  selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
