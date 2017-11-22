import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Modal } from '../components';
import { SHAPE, STYLE, TEXT } from '../config';
import { MnemonicService } from '../services';
import { addWalletAction, updateDeviceAction } from '../store/actions';
import styles from './ModalMnemonic.style';

const { WALLET } = SHAPE;
const { EN: { NEXT, PAPER_WALLET, RECOVER_PAPER_WALLET } } = TEXT;
const WORDS_LENGTH = 12;

class ModalMnemonic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: Array(WORDS_LENGTH).fill(undefined),
    };

    this._onRecover = this._onRecover.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  componentWillReceiveProps({ wallet: { hexSeed } }) {
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

  render() {
    const {
      _onRecover, _onValue, props: { onClose, visible, wallet: { hexSeed } }, state: { words = [] },
    } = this;
    const readOnly = hexSeed !== undefined;

    return (
      <Modal
        hint={readOnly ? PAPER_WALLET : RECOVER_PAPER_WALLET}
        onClose={onClose}
        style={STYLE.CENTERED}
        title="Paper key"
        visible={visible}
      >
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
          caption={readOnly ? 'Already written my paper key' : NEXT}
          disabled={!readOnly && !MnemonicService.validate(words)}
          onPress={readOnly ? onClose : _onRecover}
          style={styles.button}
        />
      </Modal>
    );
  }
}

ModalMnemonic.propTypes = {
  onClose: func,
  onRecover: func,
  visible: bool,
  wallet: shape(WALLET),
};

ModalMnemonic.defaultProps = {
  onClose() {},
  onRecover() {},
  visible: false,
  wallet: {},
};

const mapStateToProps = undefined;
const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMnemonic);
