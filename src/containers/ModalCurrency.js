import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal, Option } from '../components';
import { C, STYLE } from '../config';

const { FIAT, SYMBOL } = C;
const values = Object.values(FIAT);


const ModalCurrency = ({ onClose, onValue, visible }) =>  (
  <Modal title="Choose your currency" visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      { values.map(item => (
        <Option key={item} hint={item} caption={SYMBOL[item]} onPress={() => onValue(item)} />
      ))}
    </View>
  </Modal>
);

ModalCurrency.propTypes = {
  onClose: func,
  onValue: func,
  visible: bool,
};

ModalCurrency.defaultProps = {
  onClose() {},
  onValue() {},
  visible: false,
};

export default ModalCurrency;
