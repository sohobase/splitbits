import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Modal, Option, QRreader } from '../components';
import { STYLE, TEXT } from '../config';
import { StateService, WalletService } from '../services';
import { addWalletAction, updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../store/actions';
import styles from './WalletModal.style';

const imageBTC = require('../../assets/coin-bitcoin.png');
const imageLTC = require('../../assets/coin-litecoin.png');

const { EN: { CREATE, IMPORT } } = TEXT;

class WalletModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wif: undefined,
      cameraActive: props.camera,
      coin: 'BTC',
      name: undefined,
    };
    this._onCoin = this._onCoin.bind(this);
    this._onQR = this._onQR.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillReceiveProps({ camera }) {
    this.setState({ cameraActive: camera });
  }

  _onCoin(coin) {
    this.setState({ coin });
  }

  _onQR(value) {
    this.setState({ wif: value });
  }

  async _onSubmit() {
    const {
      props: {
        addWallet, onSuccess, updateCurrencies, updateDevice, updateWallet,
      },
      state,
    } = this;
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
      _onCoin, _onQR, _onSubmit,
      props: { camera, onClose, visible },
      state: {
        wif, cameraActive, coin, name,
      },
    } = this;

    return (
      <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
        <QRreader active={cameraActive} onClose={onClose} onRead={_onQR} />
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
          { camera &&
            <TextInput
              editable={false}
              style={[styles.input, styles.inputAddress]}
              value={wif}
            /> }
          <Button
            accent
            caption={camera ? IMPORT : CREATE}
            disabled={!coin || !name}
            onPress={_onSubmit}
            style={styles.button}
          />
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
  updateCurrencies: func,
  updateDevice: func,
  updateWallet: func,
  visible: bool,
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
