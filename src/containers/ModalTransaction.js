import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Modal, Option } from '../components';
import { C, SHAPE, STYLE, TEXT } from '../config';

const { TYPE: { REQUEST, SEND } } = C;
const { DEVICE, WALLET } = SHAPE;
const {
  EN: {
    REQUEST_MONEY, REQUEST_MONEY_HINT, REQUEST_MONEY_HINT_NO_FRIENDS,
    SEND_MONEY, SEND_MONEY_HINT, SEND_MONEY_HINT_NO_BALANCE, SEND_MONEY_HINT_READ_ONLY,
  },
} = TEXT;

const sendMoneyHint = (emptyBalance, readOnly) => {
  if (readOnly) return SEND_MONEY_HINT_READ_ONLY;
  if (emptyBalance) return SEND_MONEY_HINT_NO_BALANCE;
  return SEND_MONEY_HINT;
};

const ModalTransaction = ({
  device: { devices = [] }, onClose, onPress, visible, wallet: { balance, readOnly },
}) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      <Option
        caption={SEND_MONEY}
        disabled={readOnly || balance === 0}
        hint={sendMoneyHint(balance === 0, readOnly)}
        icon="arrowForward"
        onPress={() => onPress(SEND)}
      />
      <Option
        caption={REQUEST_MONEY}
        disabled={devices.length === 0}
        hint={devices.length === 0 ? REQUEST_MONEY_HINT_NO_FRIENDS : REQUEST_MONEY_HINT}
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
  wallet: shape(WALLET),
};

ModalTransaction.defaultProps = {
  onClose: undefined,
  onPress() {},
  visible: false,
  wallet: {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(ModalTransaction);
