import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal, Option } from '../components';
import { STYLE, TEXT } from '../config';

const {
  EN: {
    REQUEST_MONEY, REQUEST_MONEY_HINT, SEND_MONEY, SEND_MONEY_HINT,
  },
} = TEXT;

const ModalTransaction = ({
  onClose, onRequest, onSend, visible,
}) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      <Option caption={SEND_MONEY} hint={SEND_MONEY_HINT} icon="arrowForward" onPress={onSend} />
      <Option caption={REQUEST_MONEY} hint={REQUEST_MONEY_HINT} icon="arrowBack" onPress={onRequest} />
    </View>
  </Modal>
);

ModalTransaction.propTypes = {
  onClose: func,
  onRequest: func,
  onSend: func,
  visible: bool,
};

ModalTransaction.defaultProps = {
  onClose: undefined,
  onRequest: undefined,
  onSend: undefined,
  visible: false,
};

export default ModalTransaction;
