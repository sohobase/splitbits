import { bool, func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Modal, Option, QRreader } from '../components';
import { ASSETS, C, SHAPE, STYLE } from '../config';
import { WalletService } from '../services';
import { addWalletAction } from '../store/actions';
import { validateAddress } from './modules';
import styles from './ModalWalletNew.style';

const { CRYPTO: { BTC }, DEV } = C;
const CRYPTOS = {
  BTC: 'Bitcoin',
  // ETH: 'Ethereum', @TODO: Disabled meanwhile we don't have a full node
  LTC: 'Litecoin',
};

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

    if (camera && !DEV) return;
    this.setState({
      address: WalletService.addressFromHexSeed(hexSeed, coin),
      coin,
    });
  }

  _onQR(value) {
    const { address, type } = validateAddress(value) || {};

    this.setState({ address, type, cameraActive: !address && !type });
  }

  async _onSubmit() {
    const {
      props: {
        addWallet, camera, hexSeed, onSuccess,
      },
      state,
    } = this;

    this.setState({ processing: true });
    const wallet = await WalletService[camera ? 'import' : 'create']({ ...state, hexSeed });
    if (wallet) {
      await addWallet(wallet);
      onSuccess();
    }
    this.setState({ processing: false });
  }

  render() {
    const {
      _onCoin, _onQR, _onSubmit,
      props: {
        camera, i18n, hexSeed, onClose, visible,
      },
      state: {
        address, cameraActive, coin, name, processing, wif,
      },
    } = this;
    let buttonCaption = camera ? i18n.IMPORT : i18n.CREATE;
    if (hexSeed) buttonCaption = i18n.RECOVER;

    return (
      <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
        <QRreader active={cameraActive} importing onClose={onClose} onRead={_onQR} />
        <Modal title={i18n.TYPE_OF_WALLET} visible={visible && !cameraActive} onClose={onClose} style={STYLE.CENTERED}>
          <View style={[STYLE.ROW, STYLE.CENTERED, styles.coins]}>
            {
              Object.keys(CRYPTOS).map(key => (
                <Option
                  centered
                  key={key}
                  image={ASSETS[key]}
                  caption={CRYPTOS[key]}
                  onPress={() => _onCoin(key)}
                  style={[styles.coin, coin === key && styles.coinActive]}
                />
              ))}
          </View>
          <Input
            onChangeText={text => this.setState({ name: text })}
            placeholder={`${i18n.NAME}...`}
            style={styles.input}
            value={name}
          />
          { (camera || hexSeed) &&
            <Input editable={false} style={[styles.input, styles.inputAddress]} value={wif || address} /> }
          <View style={styles.button}>
            <Button
              accent
              caption={buttonCaption}
              disabled={!coin || !name}
              processing={processing}
              onPress={_onSubmit}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

ModalWalletNew.propTypes = {
  addWallet: func,
  camera: bool,
  i18n: shape(SHAPE.I18N).isRequired,
  hexSeed: string,
  onClose: func,
  onSuccess: func,
  visible: bool,
};

ModalWalletNew.defaultProps = {
  addWallet() {},
  camera: false,
  hexSeed: undefined,
  onClose() {},
  onSuccess() {},
  visible: false,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWalletNew);
