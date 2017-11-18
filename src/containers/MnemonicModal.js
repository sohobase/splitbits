import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Modal } from '../components';
import { C, SHAPE, STYLE, TEXT } from '../config';
import { MnemonicService, StateService, WalletService } from '../services';
import { addWalletAction, updateDeviceAction } from '../store/actions';
import styles from './MnemonicModal.style';

const { WALLET } = SHAPE;
const { EN: { PAPER_WALLET } } = TEXT;
const WORDS = 12;

class MnemonicModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: Array(WORDS).fill(undefined),
    };

    this._onRestore = this._onRestore.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  componentWillReceiveProps({ wallet: { hexSeed } }) {
    this.setState({
      words: (hexSeed) ? MnemonicService.backup(hexSeed) : Array(WORDS).fill(''),
    });
  }

  _onValue(position, value) {
    const { words = [] } = this.state;
    words[position] = value.toLowerCase();
    this.setState({ words });
  }

  _onRestore() {
    const { words } = this.state;
    console.log('_onRestore', words);
  }

  render() {
    const {
      _onRestore, _onValue, props: { onClose, visible, wallet: { hexSeed } }, state: { words = [] },
    } = this;
    const readOnly = hexSeed !== undefined;

    return (
      <Modal title="Paper key" visible={visible} onClose={onClose} style={STYLE.CENTERED}>
        <Text style={styles.hint}>{PAPER_WALLET}</Text>
        <View style={[STYLE.ROW, styles.words]}>
          { words.map((value, i) => (
            <Input
              editable={!readOnly}
              key={i.toString()}
              onChangeText={text => _onValue(i, text)}
              placeholder={`Word ${i + 1}`}
              style={[styles.word, (!readOnly && styles.input)]}
              value={value}
            />)) }
        </View>

        <Button
          accent
          caption={readOnly ? 'Already written my paper key' : 'Restore wallet'}
          disabled={!readOnly && !MnemonicService.restore(words)}
          onPress={readOnly ? onClose : _onRestore}
          style={styles.button}
        />
      </Modal>
    );
  }
}

MnemonicModal.propTypes = {
  onClose: func,
  visible: bool,
  wallet: shape(WALLET),
};

MnemonicModal.defaultProps = {
  onClose() {},
  visible: false,
  wallet: {},
};

const mapStateToProps = undefined;
const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MnemonicModal);
