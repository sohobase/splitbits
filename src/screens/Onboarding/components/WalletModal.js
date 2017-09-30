import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { addWalletAction } from '../../../store/actions';
import { Button, Modal, Option } from '../../../components';
import { STYLE } from '../../../config';
import { WalletService } from '../../../services';
import styles from './WalletModal.style';

const imageBTC = require('../../../../assets/coin-bitcoin.png');
const imageLTC = require('../../../../assets/coin-litecoin.png');

class WalletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'BTC',
      name: undefined,
    };
    this._onCoin = this._onCoin.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  async _onSubmit() {
    const { props: { addWallet, onSuccess }, state } = this;
    const wallet = await WalletService.create(state);

    if (wallet) {
      addWallet(wallet);
      onSuccess();
    }
  }

  _onCoin(coin) {
    this.setState({ coin });
  }

  render() {
    const { _onCoin, _onSubmit, props: { onClose, visible }, state: { coin, name } } = this;

    return (
      <Modal title="Type of wallet" visible={visible} onClose={onClose} style={STYLE.CENTERED}>
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
          autoFocus
          onChangeText={text => this.setState({ name: text })}
          placeholder="Choose a name..."
          style={styles.input}
          value={name}
        />
        <Button
          accent
          caption="Create wallet"
          disabled={!coin || !name}
          onPress={_onSubmit}
          style={styles.button}
        />
      </Modal>
    );
  }
}

WalletModal.propTypes = {
  addWallet: func,
  onClose: func,
  onSuccess: func,
  visible: bool,
};

WalletModal.defaultProps = {
  addWallet() {},
  onClose() {},
  onSuccess() {},
  visible: false,
};

const mapStateToProps = undefined;
const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletModal);
