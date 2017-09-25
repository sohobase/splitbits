import { bool, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../../../config';
import { Button, Modal } from '../../../components';
import styles from './OperationModal.style';

const OperationModal = ({ visible, onClose }) => (
  <Modal title="Type of transaction" visible={visible} onClose={onClose}>
    <Text>Hello World</Text>
    <Button accent caption="Close" onPress={onClose} />
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
