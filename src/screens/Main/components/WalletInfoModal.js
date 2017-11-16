import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { Modal, Option } from '../../../components';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import { ServiceWallet } from '../../../services';
import styles from './WalletInfoModal.style';

const { QR_SIZE } = THEME;
const { TYPE: { PRO } } = C;

class WalletModal extends Component {
  constructor(props) {
    super(props);
    this._onArchive = this._onArchive.bind(this);
    this._onBackup = this._onBackup.bind(this);
    this._onPro = this._onPro.bind(this);
  }

  _onArchive() {
    const { props: { onClose } } = this;
    console.log('onArchive', ServiceWallet);
    onClose();
  }

  _onBackup() {
    const { props: { onClose } } = this;
    console.log('onBackup');
    onClose();
  }

  _onPro() {
    const { props: { onClose } } = this;
    console.log('onPro');
    onClose();
  }

  render() {
    const {
      _onArchive, _onBackup, _onPro,
      props: { onClose, visible, wallet: { address, imported, type, readOnly } },
    } = this;

    return (
      <Modal title="Wallet" visible={visible} onClose={onClose}>
        <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.info]}>
          <QRCode value={address} size={QR_SIZE} style={styles.qr} />
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={[STYLE.COL]}>
          <Option
            caption="Create a backup"
            hint="The simplest way to have control of your wallet."
            icon="backup"
            onPress={_onBackup}
          />
          <Option
            caption="Archive this wallet"
            hint="If you do not want to use this wallet anymore."
            icon="remove"
            onPress={_onArchive}
          />
          { type !== PRO &&
            <Option
              caption="Switch to PRO"
              hint="Super powers for your wallet."
              icon="star"
              onPress={_onPro}
              disabled
            /> }
        </View>
      </Modal>
    );
  }
}

WalletModal.propTypes = {
  onClose: func,
  visible: bool,
  wallet: SHAPE.WALLET,
};

WalletModal.defaultProps = {
  onClose: undefined,
  visible: false,
  wallet: undefined,
};

export default WalletModal;
