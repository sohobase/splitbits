import React from 'react';
import { TextInput, View } from 'react-native';
// import { View as Animatable } from 'react-native-animatable';
import { Icon } from '../../../components';
import { STYLE } from '../../../config';
import { DevicesList } from '../../../containers';
import styles from './Devices.style';

const Devices = () => (
  <View style={styles.container}>
    <View style={[STYLE.ROW, STYLE.FIELDSET]}>
      <TextInput
        placeholder="Search or read a QR..."
        style={styles.input}
      />
      <Icon value="camera" />
    </View>
    <DevicesList />
  </View>
);

Devices.propTypes = {
  // item: SHAPE.TRANSACTION,
};

Devices.defaultProps = {
  // item: {},
};

export default Devices;
