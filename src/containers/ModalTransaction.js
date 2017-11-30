import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Modal, Option } from '../components';
import { C, SHAPE, STYLE, TEXT } from '../config';

const { TYPE: { REQUEST, SEND } } = C;
const { DEVICE } = SHAPE;
const {
  EN: {
    REQUEST_MONEY, REQUEST_MONEY_HINT, SEND_MONEY, SEND_MONEY_HINT,
  },
} = TEXT;

const ModalTransaction = ({
  device: { devices = [] }, onClose, onPress, visible,
}) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      <Option caption={SEND_MONEY} hint={SEND_MONEY_HINT} icon="arrowForward" onPress={() => onPress(SEND)} />
      <Option
        caption={REQUEST_MONEY}
        disabled={devices.length === 0}
        hint={REQUEST_MONEY_HINT}
        icon="arrowBack"
        onPress={() => onPress(REQUEST)}
      />
    </View>
  </Modal>
);

ModalTransaction.propTypes = {
  device: shape(DEVICE).isRequired,
  onClose: func,
  onPress: func,
  visible: bool,
};

ModalTransaction.defaultProps = {
  onClose: undefined,
  onPress() {},
  visible: false,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(ModalTransaction);
