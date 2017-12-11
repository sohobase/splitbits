import { func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { STYLE, TEXT } from '../../../config';
import { Icon, Touchable } from '../../../components';
import styles from './Fingerprint.style';

const { EN: { USE_FINGERPRINT } } = TEXT;

const Fingerprint = ({ onSuccess }) => (
  <Motion animation="bounceInUp" delay={400}>
    <Touchable raised onPress={onSuccess}>
      <View style={[STYLE.ROW, STYLE.CENTERED, styles.fingerPrint]}>
        <Icon value="fingerprint" style={[styles.icon]} />
        <Text style={styles.hint}>{USE_FINGERPRINT}</Text>
      </View>
    </Touchable>
  </Motion>
);

Fingerprint.propTypes = {
  onSuccess: func,
};

Fingerprint.defaultProps = {
  onSuccess() {},
};

export default Fingerprint;
