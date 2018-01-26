import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Amount, Button, Modal, Option } from '../components';
import { C, SHAPE, STYLE, THEME } from '../config';
import { WalletService } from '../services';
import { removeWalletAction, updateTransactionsAction } from '../store/actions';
import styles from './ModalWallet.style';

const { SATOSHI, PRICE_PRO, TYPE: { PRO } } = C;
const { QR_SIZE } = THEME;

class ModalWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pro: false,
    };
    this._onArchive = this._onArchive.bind(this);
    this._onModalPro = this._onModalPro.bind(this);
    this._onPro = this._onPro.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ pro: false });
  }

  async _onArchive() {
    const { onClose, removeWallet, wallet } = this.props;
    await WalletService.archive({ id: wallet.id }).then(() => removeWallet(wallet));
    onClose();
  }

  _onModalPro() {
    this.setState({ pro: !this.state.pro });
  }

  async _onPro() {
    const {
      _onModalPro,
      props: {
        currencies, device: { currency }, onClose, updateTransactions, wallet: { coin, id },
      },
    } = this;

    const transaction = await WalletService.switchToPRO({
      id,
      amount: parseInt((PRICE_PRO[coin] / SATOSHI) * currencies[currency][coin], 10),
    });
    if (transaction && transaction.id) {
      updateTransactions(transaction);
      _onModalPro();
      onClose();
    }
  }

  render() {
    const {
      _onArchive, _onModalPro, _onPro,
      props: {
        i18n, onBackup, onClose, visible, wallet,
        device: { currency },
      },
      state: { pro },
    } = this;
    const {
      address, backup, coin, imported, readOnly, type,
    } = wallet;
    const created = !imported && !readOnly;

    return (
      <View>
        <Modal title={i18n.WALLET} visible={visible && !pro} onClose={onClose}>
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
            { type !== PRO &&
              <Option
                caption={i18n.SWITCH_PRO}
                hint={i18n.CAPTION.SWITCH_PRO}
                icon="star"
                onPress={_onModalPro}
              /> }
          </View>
        </Modal>

        <Modal title={i18n.SWITCH_PRO} visible={visible && pro} onClose={_onModalPro}>
          <View style={[STYLE.CENTERED, styles.content]}>
            <Text style={styles.subtitle}>{i18n.CAPTION.SWITCH_PRO}</Text>
            <Text style={styles.text}>Real time push notifications</Text>
            <Text style={styles.text}>Transfer balance between your wallets</Text>
            <Text style={styles.text}>Lower fees</Text>
            <Text style={styles.text}>...and more coming features.</Text>
          </View>
          <View style={styles.buttons}>
            <Button accent onPress={_onPro}>
              <Amount caption="Upgrade for " coin={currency} value={PRICE_PRO[coin]} style={styles.button} />
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

ModalWallet.propTypes = {
  currencies: shape(SHAPE.CURRENCIES).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onBackup: func,
  onClose: func,
  removeWallet: func,
  updateTransactions: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET).isRequired,
};

ModalWallet.defaultProps = {
  onBackup() {},
  onClose() {},
  removeWallet() {},
  updateTransactions() {},
  visible: false,
};

const mapStateToProps = ({ currencies, i18n, device }) => ({
  currencies,
  i18n,
  device,
});

const mapDispatchToProps = dispatch => ({
  removeWallet: wallet => dispatch(removeWalletAction(wallet)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWallet);
