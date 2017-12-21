import { func, shape, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { DeviceItem } from '../../../containers/components';
import styles from './Recipient.style';

const { TYPE: { SEND } } = C;

const Recipient = ({
  address, concept, device, deviceId, i18n, navigation: { navigate }, onCamera, onConcept, type,
}) => (
  <View>
    <Input
      editable={onConcept !== undefined}
      onChangeText={onConcept}
      placeholder={`${i18n.ADD_NOTE}...`}
      style={[STYLE.ROW, STYLE.LIST_ITEM]}
      value={concept}
    />
    <View style={[STYLE.ROW, STYLE.LIST_ITEM, { alignItems: 'center', justifyContent: 'center' }]}>
      { deviceId
        ? <DeviceItem data={device} style={styles.device} />
        :
        <Touchable onPress={() => navigate('Friends', { selectMode: true })} style={styles.input}>
          <Text style={[styles.hint, styles.input]}>{`${i18n.CHOOSE_A_FRIEND}...`}</Text>
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
          placeholder={`...${i18n.USE_PUBLIC_ADDRESS}`}
          style={styles.input}
          value={deviceId ? undefined : address}
        />
        <Button icon="camera" raised onPress={onCamera} captionStyle={styles.icon} />
      </View>
    }
  </View>
);

Recipient.propTypes = {
  address: string,
  concept: string,
  device: shape(SHAPE.DEVICE),
  deviceId: string,
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION),
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

const mapStateToProps = ({ device: { devices }, i18n }, { deviceId }) => {
  const device = devices.find(({ id }) => id === deviceId);

  return { devices, device, i18n };
};

export default connect(mapStateToProps)(Recipient);
