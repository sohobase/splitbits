import { arrayOf, func, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import { DeviceItem } from '../../../containers/components';
import styles from './Recipient.style';

const Recipient = ({ address, concept, device, deviceId, navigation: { navigate }, onCamera, onConcept }) => (
  <View>
    <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
      { deviceId
        ? <DeviceItem data={device} style={styles.device} />
        : <Text style={styles.hint}>Choose a recipient...</Text>
      }
      <Button
        captionStyle={styles.icon}
        icon="add"
        onPress={() => navigate('Friends', { selectMode: true })}
        raised
      />
    </View>
    <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
      <Input
        editable={false}
        placeholder="... or use a public address"
        style={styles.input}
        value={address}
      />
      <Button icon="camera" raised onPress={onCamera} captionStyle={styles.icon} />
    </View>
    <Input
      editable={onConcept !== undefined}
      onChangeText={onConcept}
      placeholder="Concept"
      style={[STYLE.ROW, STYLE.LIST_ITEM]}
      value={concept}
    />
  </View>
);

Recipient.propTypes = {
  address: string,
  concept: string,
  device: SHAPE.DEVICE,
  deviceId: string,
  navigation: SHAPE.NAVIGATION,
  onCamera: func,
  onConcept: func,
};

Recipient.defaultProps = {
  address: undefined,
  concept: undefined,
  device: undefined,
  deviceId: undefined,
  navigation: undefined,
  onCamera() {},
  onConcept: undefined,
};

const mapStateToProps = ({ device: { devices } }, { deviceId }) => {
  const device = devices.find(({ id }) => id === deviceId);

  return { devices, device };
};


export default connect(mapStateToProps)(Recipient);
