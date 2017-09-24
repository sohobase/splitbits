import { bool, func } from 'prop-types';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { STYLE } from '../../../config';
import { Modal } from '../../../components';
import styles from './OperationModal.style';

const OperationModal = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose}>
    <Text>Hello World</Text>
    <Button title="Close" onPress={onClose} />
  </Modal>
);

OperationModal.propTypes = {
  onClose: func,
  visible: bool,
};

OperationModal.defaultProps = {
  onClose: undefined,
  visible: false,
};

export default OperationModal;
