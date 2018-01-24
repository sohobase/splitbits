import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Amount, Button, Modal, Option } from '../components';
import { C, SHAPE, STYLE, THEME } from '../config';
import { WalletService } from '../services';
import { removeWalletAction } from '../store/actions';
import ModalMnemonic from './ModalMnemonic';
import styles from './ModalWallet.style';

const { TYPE: { PRO } } = C;
const { QR_SIZE } = THEME;

class ModalWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: false,
      pro: false,
    };
    this._onArchive = this._onArchive.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onPro = this._onPro.bind(this);
    this._onMnemonic = this._onMnemonic.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ mnemonic: false, pro: false });
  }

  async _onArchive() {
    const { onClose, removeWallet, wallet } = this.props;
    await WalletService.archive({ id: wallet.id }).then(() => removeWallet(wallet));
    onClose();
  }

  _onModal(key) {
    this.setState({ [key]: !this.state[key] });
  }

  _onPro() {
    this._onModal('pro');
    this.props.onRecover();
  }

  _onMnemonic(hexSeed) {
    this._onModal('mnemonic');
    this.props.onRecover(hexSeed);
  }

  render() {
    const {
      _onArchive, _onModal, _onMnemonic, _onPro,
      props: {
        i18n, onClose, visible, wallet,
      },
      state: {
        mnemonic, pro,
      },
    } = this;
    const {
      address, backup, imported, readOnly, type,
    } = wallet;
    const created = !imported && !readOnly;

    return (
      <View>
        <Modal title={i18n.WALLET} visible={visible && !pro && !mnemonic} onClose={onClose}>
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
                onPress={() => _onModal('mnemonic')}
              /> }
            <Option
              caption={i18n.ARCHIVE_WALLET}
              hint={i18n.CAPTION.ARCHIVE_WALLET}
              icon="remove"
              disabled={created && !backup}
              onPress={_onArchive}
            />
            { type !== PRO &&
              <Option
                caption={i18n.SWITCH_PRO}
                hint={i18n.CAPTION.SWITCH_PRO}
                icon="star"
                onPress={() => _onModal('pro')}
              /> }
          </View>
        </Modal>

        <Modal title={i18n.SWITCH_PRO} visible={visible && pro} onClose={() => _onModal('pro')}>
          <View style={[STYLE.CENTERED, styles.content]}>
            <Text style={styles.subtitle}>{i18n.CAPTION.SWITCH_PRO}</Text>
            <Text style={styles.text}>Real time push notifications</Text>
            <Text style={styles.text}>Transfer balance between your wallets</Text>
            <Text style={styles.text}>Lower fees</Text>
            <Text style={styles.text}>...and more coming features.</Text>
          </View>
          <View style={styles.buttons}>
            <Button accent onPress={_onPro}>
              <Amount caption="Upgrade for " coin="USD" value={4.99} style={styles.button} />
            </Button>
          </View>
        </Modal>

        <ModalMnemonic
          visible={visible && mnemonic}
          onClose={() => _onModal('mnemonic')}
          onRecover={_onMnemonic}
          wallet={wallet}
        />
      </View>
    );
  }
}

ModalWallet.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  onClose: func,
  onRecover: func,
  removeWallet: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET).isRequired,
};

ModalWallet.defaultProps = {
  onClose() {},
  onRecover() {},
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
