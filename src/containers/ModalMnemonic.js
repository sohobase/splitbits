import { SecureStore } from 'expo';
import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Button, Input, Modal } from '../components';
import { SHAPE, STYLE } from '../config';
import { MnemonicService } from '../services';
import { updateWalletAction } from '../store/actions';
import styles from './ModalMnemonic.style';

const { WALLET } = SHAPE;
const WORDS_LENGTH = 12;

class ModalMnemonic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: Array(WORDS_LENGTH).fill(undefined),
    };

    this._onBackup = this._onBackup.bind(this);
    this._onRecover = this._onRecover.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  async componentWillReceiveProps({ visible, wallet: { address, coin } }) {
    if (!visible) return;
    const hexSeed = address && await SecureStore.getItemAsync(`${coin}_${address}`);

    this.setState({
      words: (hexSeed) ? MnemonicService.backup(hexSeed) : Array(WORDS_LENGTH).fill(''),
    });
  }

  _onValue(position, value) {
    const { words = [] } = this.state;
    words[position] = value.toLowerCase();
    this.setState({ words });
  }

  _onRecover() {
    const { props: { onRecover }, state: { words } } = this;
    onRecover(MnemonicService.restore(words));
  }

  _onBackup() {
    const { props: { onClose, updateWallet, wallet } } = this;
    updateWallet({ ...wallet, backup: true });
    onClose();
  }

  render() {
    const {
      _onBackup, _onRecover, _onValue,
      props: {
        i18n, onClose, visible, wallet: { address },
      },
      state: { words = [] },
    } = this;
    const readOnly = !!address;

    return (
      <Modal
        hint={readOnly ? i18n.PAPER_WALLET : i18n.RECOVER_PAPER_WALLET}
        onClose={onClose}
        style={STYLE.CENTERED}
        title={i18n.PAPER_KEY}
        visible={visible}
      >
        <View style={[STYLE.ROW, styles.words]}>
          { words.map((value, i) => (
            <Input
              editable={!readOnly}
              key={i.toString()}
              onChangeText={text => _onValue(i, text)}
              placeholder={`${i18n.WORD} ${i + 1}`}
              style={[styles.word, (!readOnly && styles.input)]}
              value={value}
            />)) }
        </View>

        <Button
          caption={readOnly ? i18n.PAPER_KEY_DONE : i18n.NEXT}
          disabled={!readOnly && !MnemonicService.validate(words)}
          onPress={readOnly ? _onBackup : _onRecover}
          style={styles.button}
        />
      </Modal>
    );
  }
}

ModalMnemonic.propTypes = {
  i18n: shape({}).isRequired,
  onClose: func,
  onRecover: func,
  visible: bool,
  updateWallet: func,
  wallet: shape(WALLET),
};

ModalMnemonic.defaultProps = {
  onClose() {},
  onRecover() {},
  updateWallet() {},
  visible: false,
  wallet: {},
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

const mapDispatchToProps = dispatch => ({
  updateWallet: wallet => dispatch(updateWalletAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMnemonic);
