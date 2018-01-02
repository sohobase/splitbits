import { bool, func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../../../components';
import { STYLE } from '../../../config';
import styles from './Fieldset.style';

const Fieldset = ({
  input, label, value, onChange,
}) => (
  <View style={STYLE.LIST_ITEM}>
    <Text style={STYLE.LABEL}>{label}</Text>
    { input
      ? <Input onChangeText={onChange} placeholder="..." style={styles.fieldset} value={value} />
      : <Text style={styles.fieldset} onPress={onChange}>{value}</Text> }
  </View>
);

Fieldset.propTypes = {
  input: bool,
  label: string,
  value: string,
  onChange: func,
};

Fieldset.defaultProps = {
  input: false,
  label: undefined,
  value: undefined,
  onChange() {},
};

export default Fieldset;
