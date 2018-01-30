import { bool, number, func, shape, string } from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { Amount, Button } from '../../../components';
import { C, SHAPE } from '../../../config';
import styles from './ButtonSubmit.style';

const { TYPE: { REQUEST, SEND } } = C;

const ButtonSubmit = ({
  amount = 0, coin, disabled, fingerprint, i18n, item, onPress, type, wallet, ...inherit
}) => {
  const editable = !item;

  return (
    <Button
      {...inherit}
      accent
      disabled={disabled}
      motion={{ animation: 'bounceInUp', delay: 600 }}
      onPress={onPress}
    >
      <Amount
        caption={`${(editable && type === REQUEST) ? i18n.REQUEST : i18n.SEND} `}
        coin={coin}
        style={styles.buttonCaption}
        value={amount}
      />
      { fingerprint && disabled && <Text style={styles.hint}>{i18n.FINGERPRINT_TO_UNLOCK}</Text> }
    </Button>
  );
};

ButtonSubmit.propTypes = {
  amount: number,
  coin: string,
  disabled: bool,
  fingerprint: bool,
  i18n: shape(SHAPE.I18N).isRequired,
  item: shape(SHAPE.TRANSACTION),
  onPress: func,
  type: string,
};

ButtonSubmit.defaultProps = {
  amount: 0,
  coin: undefined,
  disabled: true,
  fingerprint: false,
  item: undefined,
  onPress() {},
  type: SEND,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

export default connect(mapStateToProps)(ButtonSubmit);
