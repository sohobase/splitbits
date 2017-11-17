import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Modal } from '../components';
import { C, STYLE } from '../config';
import { StateService, WalletService } from '../services';
import { addWalletAction, updateDeviceAction } from '../store/actions';
import styles from './MnemonicModal.style';

const { VERB: { CREATE, IMPORT } } = C;
const WORDS = 12;

class MnemonicModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Array(WORDS).fill('hola'),
    };
    this._onRestore = this._onRestore.bind(this);
    this._onValue = this._onValue.bind(this);
  }

  _onValue(position, value) {
    const { values = [] } = this.state;
    values[position] = value;
    this.setState({ values });
  }

  _onRestore() {

  }

  render() {
    const {
      _onRestore, _onValue, props: { onClose, readOnly, visible }, state: { values = [] },
    } = this;

    return (
      <Modal title="Mnemonic" visible={visible} onClose={onClose} style={STYLE.CENTERED}>
        <View style={[STYLE.ROW, STYLE.CsENTERED, styles.words]}>
          { values.map((value, i) => (
            <Input
              key={i.toString()}
              onChangeText={text => _onValue(i, text)}
              placeholder={`Word ${i + 1}`}
              style={readOnly ? styles.text : styles.input}
              value={value}
            />)) }
        </View>

        <Button
          accent
          caption={readOnly ? 'I already wrote in a paper' : 'Restore wallet'}
          disabled={readOnly}
          onPress={readOnly ? onClose : _onRestore}
          style={styles.button}
        />
      </Modal>
    );
  }
}

MnemonicModal.propTypes = {
  onClose: func,
  readOnly: bool,
  visible: bool,
};

MnemonicModal.defaultProps = {
  onClose() {},
  readOnly: false,
  visible: false,
};

const mapStateToProps = undefined;
const mapDispatchToProps = dispatch => ({
  addWallet: wallet => dispatch(addWalletAction(wallet)),
  updateDevice: wallet => dispatch(updateDeviceAction(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MnemonicModal);
