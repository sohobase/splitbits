import { func, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import { SHAPE, STYLE } from '../../../config';
import { Icon, Touchable } from '../../../components';
import styles from './Fingerprint.style';

const Fingerprint = ({ i18n, onSuccess }) => (
  <Motion animation="bounceInUp" delay={400}>
    <Touchable raised onPress={onSuccess}>
      <View style={[STYLE.ROW, STYLE.CENTERED, styles.fingerPrint]}>
        <Icon value="fingerprint" style={[styles.icon]} />
        <Text style={styles.hint}>{i18n.USE_FINGERPRINT}</Text>
      </View>
    </Touchable>
  </Motion>
);

Fingerprint.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  onSuccess: func,
};

Fingerprint.defaultProps = {
  onSuccess() {},
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

export default connect(mapStateToProps)(Fingerprint);
