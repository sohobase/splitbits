import { number, func, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Amount, Button } from '../../../components';
import { C, SHAPE } from '../../../config';
import styles from './ButtonSubmit.style';

const { TYPE: { REQUEST, SEND } } = C;

const ButtonSubmit = ({
  amount = 0, concept, i18n, item, onCancel, onPress, recipient, type, wallet, ...inherit
}) => {
  const editable = !item;
  const { balance, coin } = wallet;
  const cancel = !editable && wallet.address === item.to.address;
  const disabled = (editable && (!concept || !recipient || !amount)) ||
    (((type === REQUEST && item) || type === SEND) && balance < amount);

  return (
    <View style={styles.wrapper}>
      <Button
        {...inherit}
        accent
        caption={cancel ? i18n.CANCEL_REQUEST : undefined}
        disabled={!cancel && disabled}
        motion={{ animation: 'bounceInUp', delay: 600 }}
        onPress={cancel ? onCancel : onPress}
      >
        { !cancel &&
          <Amount
            caption={`${(editable && type === REQUEST) ? i18n.REQUEST : i18n.SEND} `}
            coin={coin}
            style={styles.buttonCaption}
            value={amount}
          /> }
      </Button>
    </View>
  );
};

ButtonSubmit.propTypes = {
  amount: number,
  concept: string,
  i18n: shape(SHAPE.I18N).isRequired,
  item: shape(SHAPE.TRANSACTION),
  onCancel: func,
  onPress: func,
  recipient: shape(SHAPE.RECIPIENT),
  type: string,
  wallet: shape(SHAPE.WALLET),
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

const mapStateToProps = ({ i18n, recipient }) => ({
  i18n, recipient,
});

export default connect(mapStateToProps)(ButtonSubmit);
