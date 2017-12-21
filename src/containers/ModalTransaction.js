import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Modal, Option } from '../components';
import { C, SHAPE, STYLE } from '../config';

const { TYPE: { REQUEST, SEND } } = C;

const ModalTransaction = ({
  device: { devices = [] }, i18n, onClose, onPress, visible, wallet: { balance, readOnly },
}) => {
  let hint = i18n.SEND_MONEY_HINT;
  if (readOnly) hint = i18n.SEND_MONEY_HINT_READ_ONLY;
  else if (balance === 0) hint = i18n.SEND_MONEY_HINT_NO_BALANCE;

  return (
    <Modal title={i18n.TYPE_OF_TRANSACTION} visible={visible} onClose={onClose}>
      <View style={[STYLE.COL]}>
        <Option
          caption={i18n.SEND_MONEY}
          disabled={readOnly || balance === 0}
          hint={hint}
          icon="arrowForward"
          onPress={() => onPress(SEND)}
        />
        <Option
          caption={i18n.REQUEST_MONEY}
          disabled={devices.length === 0}
          hint={devices.length === 0 ? i18n.REQUEST_MONEY_HINT_NO_FRIENDS : i18n.REQUEST_MONEY_HINT}
          icon="arrowBack"
          onPress={() => onPress(REQUEST)}
        />
      </View>
    </Modal>
  );
};

ModalTransaction.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  onClose: func,
  onPress: func,
  visible: bool,
  wallet: shape(SHAPE.WALLET),
};

ModalTransaction.defaultProps = {
  onClose: undefined,
  onPress() {},
  visible: false,
  wallet: {},
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

export default connect(mapStateToProps)(ModalTransaction);
