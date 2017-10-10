import React from 'react';
import { Text, View } from 'react-native';
import { SHAPE, STYLE } from '../../../config';
import styles from './Info.style';

const TransactionInfo = ({ item: { confirmations = 0, createdAt, state } }) => (
  <View style={styles.info}>
    <View style={STYLE.FIELDSET}>
      <Text style={styles.label}>State</Text>
      <Text style={styles.value}>{state}</Text>
    </View>
    <View style={STYLE.FIELDSET}>
      <Text style={styles.label}>Confirmations</Text>
      <Text style={styles.value}>{confirmations}</Text>
    </View>
    <View style={STYLE.FIELDSET}>
      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>{createdAt}</Text>
    </View>
  </View>
);

TransactionInfo.propTypes = {
  item: SHAPE.TRANSACTION,
};

TransactionInfo.defaultProps = {
  item: {},
};

export default TransactionInfo;
