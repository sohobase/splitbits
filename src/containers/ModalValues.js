import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Modal, Option } from '../components';
import { C, STYLE } from '../config';

const { SYMBOL } = C;

const ModalValues = ({
  onClose, onValue, title, values, visible,
}) => (
  <Modal title={title} visible={visible} onClose={onClose}>
    <View style={[STYLE.COL]}>
      { values.map(value => <Option key={value} hint={value} caption={SYMBOL[value]} onPress={() => onValue(value)} />)}
    </View>
  </Modal>
);

ModalValues.propTypes = {
  onClose: func,
  onValue: func,
  title: string,
  values: arrayOf(string),
  visible: bool,
};

ModalValues.defaultProps = {
  onClose() {},
  onValue() {},
  title: undefined,
  values: [],
  visible: false,
};

export default ModalValues;
