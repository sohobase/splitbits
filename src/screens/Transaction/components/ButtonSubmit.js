import { number, func, shape, string } from 'prop-types';
import React from 'react';
import { Amount, Button } from '../../../components';
import { C, SHAPE, TEXT } from '../../../config';
import styles from './ButtonSubmit.style';

const { TYPE, TYPE: { REQUEST } } = C;
const { TRANSACTION, WALLET } = SHAPE;
const { EN: { CANCEL_REQUEST, SEND } } = TEXT;

const ButtonSubmit = ({
  amount, item, onCancel, onPress, type, wallet, ...inherit
}) => {
  const editable = !item;
  const { balance, coin } = wallet;
  const cancel = !editable && wallet.address === item.to.address;

  return (
    <Button
      {...inherit}
      accent
      caption={cancel ? CANCEL_REQUEST : undefined}
      disabled={!cancel && type === TYPE.SEND && balance <= amount}
      motion={{ animation: 'bounceInUp', delay: 600 }}
      onPress={cancel ? onCancel : onPress}
      style={styles.button}
    >
      { !cancel &&
        <Amount
          caption={`${(editable && type === REQUEST) ? REQUEST : SEND} `}
          coin={coin}
          style={styles.buttonCaption}
          value={amount}
        /> }
    </Button>
  );
};

ButtonSubmit.propTypes = {
  amount: number,
  item: shape(TRANSACTION),
  onCancel: func,
  onPress: func,
  type: string,
  wallet: shape(WALLET),
};

ButtonSubmit.defaultProps = {
  amount: 0,
  onCancel() {},
  onPress() {},
  item: undefined,
  type: SEND,
  wallet: undefined,
};

export default ButtonSubmit;
