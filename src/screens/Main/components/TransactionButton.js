import { bool, func } from 'prop-types';
import React from 'react';
import { Button } from '../../../components';
import { THEME } from '../../../config';
import styles from './TransactionButton.style';

const { DURATION } = THEME.ANIMATION;

const TransactionButton = ({ onPress, visible }) => (
  <Button
    accent
    motion={{
      animation: (visible ? 'bounceInUp' : 'bounceOutDown'),
      delay: (visible ? 400 : 100),
      duration: DURATION,
    }}
    circle
    icon="operations"
    onPress={onPress}
    style={styles.button}
  />
);

TransactionButton.propTypes = {
  onPress: func,
  visible: bool,
};

TransactionButton.defaultProps = {
  onPress() {},
  visible: false,
};

export default TransactionButton;
