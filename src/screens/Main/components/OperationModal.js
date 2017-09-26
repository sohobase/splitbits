import { bool, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Modal, Option } from '../../../components';
import { STYLE } from '../../../config';
import styles from './OperationModal.style';

const OperationModal = ({ onClose, onRequest, onSend, visible }) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL, styles.options]}>
      <Option
        caption="Send Money"
        hint="lorem ipsum..."
        onPress={onRequest}
        style={styles.option}
      />
      <Option
        caption="Request Money"
        hint="lorem ipsum..."
        onPress={onSend}
        style={styles.option}
      />
    </View>
  </Modal>
);

OperationModal.propTypes = {
  onClose: func,
  onRequest: func,
  onSend: func,
  visible: bool,
};

OperationModal.defaultProps = {
  onClose: undefined,
  onRequest: undefined,
  onSend: undefined,
  visible: false,
};

export default OperationModal;
