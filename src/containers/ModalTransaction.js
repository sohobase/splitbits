import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal, Option } from '../components';
import { STYLE } from '../config';

const ModalTransaction = ({
  onClose, onRequest, onSend, visible,
}) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      <Option
        caption="Send Money"
        hint="lorem ipsum..."
        icon="arrowForward"
        onPress={onSend}
      />
      <Option
        caption="Request Money"
        hint="lorem ipsum..."
        icon="arrowBack"
        onPress={onRequest}
      />
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
