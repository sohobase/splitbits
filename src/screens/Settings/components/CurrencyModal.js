import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal, Option } from '../../../components';
import { C, STYLE } from '../../../config';
import styles from './CameraModal.style';

const values = Object.values(C.FIAT);

const CameraModal = ({ onClose, onValue, visible }) =>  (
  <Modal title="Choose your currency" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      { values.map(item => <Option key={item} caption={item} onPress={() => onValue(item)} style={styles.option} />)}
    </View>
  </Modal>
);

CameraModal.propTypes = {
  onClose: func,
  onValue: func,
  visible: bool,
};

CameraModal.defaultProps = {
  onClose() {},
  onValue() {},
  visible: false,
};

export default CameraModal;
