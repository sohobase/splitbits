import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Modal, Option, QRreader } from '../components';
import { STYLE } from '../config';
import { StateService, WalletService } from '../services';
import { addWalletAction, updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../store/actions';
import styles from './WalletModal.style';

const imageBTC = require('../../assets/coin-bitcoin.png');
const imageLTC = require('../../assets/coin-litecoin.png');

class WalletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wif: undefined,
      cameraActive: false,
      coin: 'BTC',
      name: undefined,
    };
    this._onCoin = this._onCoin.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onQR = this._onQR.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onCoin(coin) {
    this.setState({ coin });
  }

  _onCamera() {
    this.setState({ cameraActive: !this.state.cameraActive });
  }

  _onQR(value) {
    this.setState({ wif: value });
  }

  async _onSubmit() {
    const { props: { addWallet, onSuccess, updateCurrencies, updateDevice, updateWallet }, state } = this;
    const wallet = await WalletService[state.wif ? 'import' : 'create'](state);

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
      _onCoin, _onCamera, _onQR, _onSubmit,
      props: { camera, onClose, visible },
      state: { wif, cameraActive, coin, name },
    } = this;

    return (
      <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
        <QRreader active={cameraActive} onClose={_onCamera} onRead={_onQR} />
        <Modal title="Type of wallet" visible={visible && !cameraActive} onClose={onClose} style={STYLE.CENTERED}>
          <View style={[STYLE.ROW, STYLE.CENTERED, styles.coins]}>
            <Option
              centered
              image={imageBTC}
              caption="Bitcoin"
              onPress={() => _onCoin('BTC')}
              style={[styles.coin, coin === 'BTC' && styles.coinActive]}
            />
            <Option
              centered
              image={imageLTC}
              caption="Litecoin"
              onPress={() => _onCoin('LTC')}
              style={[styles.coin, coin === 'LTC' && styles.coinActive]}
            />
          </View>
          <TextInput
            _autoFocus
            onChangeText={text => this.setState({ name: text })}
            placeholder="Choose a name..."
            style={styles.input}
            underlineColorAndroid="transparent"
            value={name}
          />
          { wif &&
            <TextInput
              editable={false}
              style={[styles.input, styles.inputAddress]}
              value={wif}
            /> }
          <View style={STYLE.ROW}>
            { camera && <Button accent caption="Import" onPress={_onCamera} style={styles.button} /> }
            <Button
              accent
              caption="Create"
              disabled={!coin || !name}
              onPress={_onSubmit}
              style={styles.button}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

WalletModal.propTypes = {
  addWallet: func,
  camera: bool,
  onClose: func,
  onSuccess: func,
  visible: bool,
  updateCurrencies: func,
  updateDevice: func,
  updateWallet: func,
};

WalletModal.defaultProps = {
  addWallet() {},
  camera: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletModal);
