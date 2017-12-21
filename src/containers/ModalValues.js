import { bool, func, shape, string } from 'prop-types';
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
      { Object.keys(values).map(key => (
        <Option
          key={key}
          hint={SYMBOL[key] && values[key]}
          caption={SYMBOL[key] ? SYMBOL[key] : values[key]}
          onPress={() => onValue(key)}
        />
      ))}
    </View>
  </Modal>
);

ModalValues.propTypes = {
  onClose: func,
  onValue: func,
  title: string,
  values: shape({}).isRequired,
  visible: bool,
};

ModalValues.defaultProps = {
  onClose() {},
  onValue() {},
  title: undefined,
  visible: false,
};

export default ModalValues;
