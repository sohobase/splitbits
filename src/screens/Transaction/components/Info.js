import { arrayOf } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE } from '../../../config';
import styles from './Info.style';

const { SERVICE } = C;

const renderField = (caption, value, style) => (
  <View style={[STYLE.LIST_ITEM, style]}>
    <Text style={styles.label}>{caption}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const TransactionInfo = (props) => {
  const { devices, item: { confirmations = 0, concept, createdAt, from, hash, to, state } } = props;
  const device = devices.find(({ id }) => id === from.device || id === to.device);
  let imageUri;
  if (device) {
    imageUri = `${SERVICE}public/${device.image}?timestamp=${new Date().getTime().toString()}`;
  }

  return (
    <Animatable animation="bounceInUp" delay={600}>
      <View style={styles.container}>
        { device
          ?
            <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
              <Text style={styles.label}>From/To</Text>
              <Image source={{ uri: imageUri }} style={[STYLE.AVATAR, styles.avatar]} />
              <View>
                <Text style={styles.value}>{device.name}</Text>
                <Text style={styles.label}>{from.address}</Text>
              </View>
            </View>
          :
            renderField('Address', from.address)}

        { renderField('State', state, styles.half) }
        { renderField('Confirmations', confirmations, styles.half) }
        { renderField('Concept', concept) }
        { renderField('Hash', hash) }
        { renderField('Date', createdAt) }
      </View>
    </Animatable>
  );
};

TransactionInfo.propTypes = {
  devices: arrayOf(SHAPE.DEVICE),
  item: SHAPE.TRANSACTION,
};

TransactionInfo.defaultProps = {
  devices: [],
  item: {},
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies,
  devices: device.devices,
});

export default connect(mapStateToProps)(TransactionInfo);
