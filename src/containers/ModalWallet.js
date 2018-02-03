import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Button, Modal, Option } from '../components';
import { C, SHAPE, STYLE, THEME } from '../config';
import { WalletService } from '../services';
import { removeWalletAction } from '../store/actions';
import styles from './ModalWallet.style';

const { TYPE: { SEND } } = C;
const { QR_SIZE } = THEME;

class ModalWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      support: false,
    };
    this._onArchive = this._onArchive.bind(this);
    this._onModalSupport = this._onModalSupport.bind(this);
    this._onSupport = this._onSupport.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ support: false });
  }

  async _onArchive() {
    const { onClose, removeWallet, wallet } = this.props;
    await WalletService.archive({ id: wallet.id }).then(() => removeWallet(wallet));
    onClose();
  }

  _onModalSupport() {
    this.setState({ support: !this.state.support });
  }

  async _onSupport() {
    const {
      _onModalSupport,
      props: { navigation: { navigate }, onClose, wallet },
    } = this;

    navigate('Transaction', { type: SEND, wallet, support: true });
    _onModalSupport();
    onClose();
  }

  render() {
    const {
      _onArchive, _onModalSupport, _onSupport,
      props: {
        i18n, onBackup, onClose, visible, wallet,
      },
      state: { support, processing },
    } = this;
    const {
      address, backup, imported, readOnly,
    } = wallet;
    const created = !imported && !readOnly;

    return (
      <View>
        <Modal title={i18n.WALLET} visible={visible && !support} onClose={onClose}>
          <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.content]}>
            <QRCode value={address} size={QR_SIZE} />
            <Text style={styles.address}>{address}</Text>
          </View>
          <View style={[STYLE.COL]}>
            { created &&
              <Option
                caption={i18n.CREATE_BACKUP}
                hint={i18n.CAPTION.CREATE_BACKUP}
                icon="backup"
                onPress={onBackup}
              /> }
            <Option
              caption={i18n.ARCHIVE_WALLET}
              hint={i18n.CAPTION.ARCHIVE_WALLET}
              icon="remove"
              disabled={created && !backup}
              onPress={_onArchive}
            />
            <Option
              caption={i18n.SUPPORT_US}
              hint={i18n.CAPTION.SUPPORT_US}
              icon="star"
              onPress={_onModalSupport}
            />
          </View>
        </Modal>

        <Modal title={i18n.SUPPORT_US} visible={visible && support} onClose={_onModalSupport}>
          <Text style={[styles.content, styles.text]}>
            {i18n.HINT.SUPPORT_US}
          </Text>
          <View style={styles.buttons}>
            <Button accent onPress={_onSupport} processing={processing} caption={i18n.SUPPORT_US_ACCEPT} />
          </View>
        </Modal>
      </View>
    );
  }
}

ModalWallet.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  onBackup: func,
  onClose: func,
  removeWallet: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET).isRequired,
};

ModalWallet.defaultProps = {
  onBackup() {},
  onClose() {},
  removeWallet() {},
  visible: false,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

const mapDispatchToProps = dispatch => ({
  removeWallet: wallet => dispatch(removeWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWallet);
