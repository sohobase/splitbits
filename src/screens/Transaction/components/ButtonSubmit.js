import { number, func, shape, string } from 'prop-types';
import React from 'react';
import { Amount, Button } from '../../../components';
import { C, SHAPE, TEXT } from '../../../config';
import styles from './ButtonSubmit.style';

const { TYPE } = C;
const { TRANSACTION, WALLET } = SHAPE;
const { EN: { CANCEL_REQUEST, REQUEST, SEND } } = TEXT;

const ButtonSubmit = ({
  amount = 0, concept, item, onCancel, onPress, recipient, type, wallet, ...inherit
}) => {
  const editable = !item;
  const { balance, coin } = wallet;
  const cancel = !editable && wallet.address === item.to.address;
  const valid = amount > 0 && concept && recipient &&
    (type === TYPE.REQUEST ||
    (type === TYPE.SEND && balance >= amount));

  return (
    <Button
      {...inherit}
      accent
      caption={cancel ? CANCEL_REQUEST : undefined}
      disabled={!cancel && !valid}
      motion={{ animation: 'bounceInUp', delay: 600 }}
      onPress={cancel ? onCancel : onPress}
      style={styles.button}
    >
      { !cancel &&
        <Amount
          caption={`${(editable && type === TYPE.REQUEST) ? REQUEST : SEND} `}
          coin={coin}
          style={styles.buttonCaption}
          value={amount}
        /> }
    </Button>
  );
};

ButtonSubmit.propTypes = {
  amount: number,
  concept: string,
  item: shape(TRANSACTION),
  onCancel: func,
  onPress: func,
  recipient: string,
  type: string,
  wallet: shape(WALLET),
};

ButtonSubmit.defaultProps = {
  amount: 0,
  concept: undefined,
  item: undefined,
  onCancel() {},
  onPress() {},
  recipient: undefined,
  type: SEND,
  wallet: undefined,
};

export default ButtonSubmit;
