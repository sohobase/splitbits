import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Modal, Option, QRreader } from '../components';
import { C, STYLE, TEXT } from '../config';
import { StateService, WalletService } from '../services';
import { addWalletAction, updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../store/actions';
import { validateAddress } from './modules';
import styles from './ModalWalletNew.style';

const imageBTC = require('../../assets/coin-bitcoin.png');
const imageLTC = require('../../assets/coin-litecoin.png');

const { CRYPTO: { BTC, LTC } } = C;
const {
  EN: {
    CREATE, IMPORT, RECOVER, TYPE_OF_WALLET,
  },
} = TEXT;

class ModalWalletNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: undefined,
      cameraActive: props.camera,
      coin: BTC,
      name: undefined,
      processing: false,
      wif: undefined,
    };
    this._onCoin = this._onCoin.bind(this);
    this._onQR = this._onQR.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps({ camera, hexSeed }) {
    this.setState({
      address: WalletService.addressFromHexSeed(hexSeed, this.state.coin),
      cameraActive: camera,
      coin: BTC,
      name: undefined,
      processing: false,
      wif: undefined,
    });
  }

  _onCoin(coin) {
    const { props: { camera, hexSeed } } = this;

    if (camera) return;
    this.setState({
      address: WalletService.addressFromHexSeed(hexSeed, coin),
      coin,
    });
  }

  _onQR(value) {
    this.setState({
      ...validateAddress(value),
      cameraActive: false,
    });
  }

  async _onSubmit() {
    const {
      props: {
        addWallet, camera, hexSeed, onSuccess, updateCurrencies, updateDevice, updateWallet,
      },
      state,
    } = this;
    this.setState({ processing: true });
    const wallet = await WalletService[camera ? 'import' : 'create']({ ...state, hexSeed });
    this.setState({ processing: false });

    if (wallet) {
      addWallet(wallet);
      const response = await StateService.get([wallet.id]);
      if (response) {
        const { currencies = {}, device = {}, wallets = [] } = response;
        updateCurrencies(currencies);
        updateDevice(device);
        wallets.forEach(item => updateWallet(item));
      }

      onSuccess();
    }
  }

  render() {
    const {
      _onCoin, _onQR, _onSubmit,
      props: {
        camera, hexSeed, onClose, visible,
      },
      state: {
        address, cameraActive, coin, name, processing, wif,
      },
    } = this;
    let buttonCaption = camera ? IMPORT : CREATE;
    if (hexSeed) buttonCaption = RECOVER;

    return (
      <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
        <QRreader active={cameraActive} onClose={onClose} onRead={_onQR} />
        <Modal title={TYPE_OF_WALLET} visible={visible && !cameraActive} onClose={onClose} style={STYLE.CENTERED}>
          <View style={[STYLE.ROW, STYLE.CENTERED, styles.coins]}>
            <Option
              centered
              image={imageBTC}
              caption="Bitcoin"
              onPress={() => _onCoin(BTC)}
              style={[styles.coin, coin === BTC && styles.coinActive]}
            />
            <Option
              centered
              image={imageLTC}
              caption="Litecoin"
              onPress={() => _onCoin(LTC)}
              style={[styles.coin, coin === LTC && styles.coinActive]}
            />
          </View>
          <Input
            onChangeText={text => this.setState({ name: text })}
            placeholder="Choose a name..."
            style={styles.input}
            value={name}
          />
          { (camera || hexSeed) &&
            <Input editable={false} style={[styles.input, styles.inputAddress]} value={wif || address} /> }
          <Button
            accent
            caption={buttonCaption}
            disabled={!coin || !name}
            processing={processing}
            onPress={_onSubmit}
            style={styles.button}
          />
        </Modal>
      </View>
    );
  }
}

ModalWalletNew.propTypes = {
  addWallet: func,
  camera: bool,
  hexSeed: string,
  onClose: func,
  onSuccess: func,
  updateCurrencies: func,
  updateDevice: func,
  updateWallet: func,
  visible: bool,
};

ModalWalletNew.defaultProps = {
  addWallet() {},
  camera: false,
  hexSeed: undefined,
  onClose() {},
  onSuccess() {},
  visible: false,
  updateCurrencies() {},
  updateDevice() {},
  updateWallet() {},
};

const mapStateToProps = undefined;
const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
  updateCurrencies: wallet => dispatch(updateCurrenciesAction(wallet)),
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
  updateWallet: wallet => dispatch(updateWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWalletNew);
