import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Modal, Option } from '../components';
import { C, SHAPE, STYLE, THEME } from '../config';
import { WalletService } from '../services';
import { removeWalletAction } from '../store/actions';
import styles from './ModalWallet.style';

const { TYPE: { PRO } } = C;
const { QR_SIZE } = THEME;

class ModalWallet extends Component {
  constructor(props) {
    super(props);
    this._onArchive = this._onArchive.bind(this);
    this._onBackup = this._onBackup.bind(this);
    this._onPro = this._onPro.bind(this);
  }

  async _onArchive() {
    const { onClose, removeWallet, wallet } = this.props;
    await WalletService.archive({ id: wallet.id }).then(() => removeWallet(wallet));
    onClose();
  }

  _onBackup() {
    const { props: { onBackup, onClose } } = this;
    onBackup();
    onClose();
  }

  _onPro() {
    const { props: { onClose } } = this;
    onClose();
  }

  render() {
    const {
      _onArchive, _onBackup, _onPro,
      props: {
        i18n, onClose, visible,
        wallet: {
          address, backup, imported, readOnly, type,
        },
      },
    } = this;
    const created = !imported && !readOnly;

    return (
      <Modal title={i18n.WALLET} visible={visible} onClose={onClose}>
        <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.info]}>
          <QRCode value={address} size={QR_SIZE} style={styles.qr} />
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={[STYLE.COL]}>
          { created &&
            <Option caption={i18n.CREATE_BACKUP} hint={i18n.CAPTION.CREATE_BACKUP} icon="backup" onPress={_onBackup} /> }
          <Option
            caption={i18n.ARCHIVE_WALLET}
            hint={i18n.CAPTION.ARCHIVE_WALLET}
            icon="remove"
            disabled={created && !backup}
            onPress={_onArchive}
          />
          { type !== PRO &&
            <Option caption={i18n.SWITCH_PRO} hint={i18n.CAPTION.SWITCH_PRO} icon="star" onPress={_onPro} disabled /> }
        </View>
      </Modal>
    );
  }
}

ModalWallet.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  onBackup: func,
  onClose: func,
  removeWallet: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET),
};

ModalWallet.defaultProps = {
  onBackup() {},
  onClose: undefined,
  removeWallet() {},
  visible: false,
  wallet: undefined,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

const mapDispatchToProps = dispatch => ({
  removeWallet: wallet => dispatch(removeWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWallet);
