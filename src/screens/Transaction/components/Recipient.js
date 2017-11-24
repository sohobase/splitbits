import { func, shape, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Touchable } from '../../../components';
import { C, SHAPE, STYLE, TEXT } from '../../../config';
import { DeviceItem } from '../../../containers/components';
import styles from './Recipient.style';

const { TYPE: { SEND } } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const { EN: { ADD_NOTE, CHOOSE_A_FRIEND, USE_PUBLIC_ADDRESS } } = TEXT;

const Recipient = ({
  address, concept, device, deviceId, navigation: { navigate }, onCamera, onConcept, type,
}) => (
  <View>
    <Input
      editable={onConcept !== undefined}
      onChangeText={onConcept}
      placeholder={`${ADD_NOTE}...`}
      style={[STYLE.ROW, STYLE.LIST_ITEM]}
      value={concept}
    />
    <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
      { deviceId
        ? <DeviceItem data={device} style={styles.device} />
        :
        <Touchable onPress={() => navigate('Friends', { selectMode: true })} style={styles.input}>
          <Text style={styles.hint}>{`${CHOOSE_A_FRIEND}...`}</Text>
        </Touchable>
      }
      <Button
        captionStyle={styles.icon}
        icon="add"
        onPress={() => navigate('Friends', { selectMode: true })}
        raised
      />
    </View>
    { type === SEND &&
      <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
        <Input
          editable={false}
          placeholder={`...${USE_PUBLIC_ADDRESS}`}
          style={styles.input}
          value={address}
        />
        <Button icon="camera" raised onPress={onCamera} captionStyle={styles.icon} />
      </View>
    }
  </View>
);

Recipient.propTypes = {
  address: string,
  concept: string,
  device: shape(DEVICE),
  deviceId: string,
  navigation: shape(NAVIGATION),
  onCamera: func,
  onConcept: func,
  type: string,
};

Recipient.defaultProps = {
  address: undefined,
  concept: undefined,
  device: undefined,
  deviceId: undefined,
  navigation: undefined,
  onCamera() {},
  onConcept: undefined,
  type: undefined,
};

const mapStateToProps = ({ device: { devices } }, { deviceId }) => {
  const device = devices.find(({ id }) => id === deviceId);

  return { devices, device };
};

export default connect(mapStateToProps)(Recipient);
