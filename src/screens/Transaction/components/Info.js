import { arrayOf } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import { publicUri } from '../../../modules';
import styles from './Info.style';

const renderField = (caption, value, style) => (
  <View style={[STYLE.LIST_ITEM, style]}>
    <Text style={styles.label}>{caption}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const TransactionInfo = (props) => {
  const { devices, item: { confirmations = 0, concept, createdAt, from, hash, to, state } } = props;
  const device = devices.find(({ id }) => id === from.device || id === to.device);

  return (
    <Animatable animation="bounceInUp" delay={500}>
      <View style={styles.container}>
        { device
          ?
            <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
              <Image source={{ uri: (device && publicUri(device.image)) }} style={[STYLE.AVATAR, styles.avatar]} />
              <View>
                <Text style={[styles.value, styles.title]}>{device.name}</Text>
                { from.address && <Text style={styles.label}>{from.address}</Text> }
              </View>
            </View>
          :
            renderField('Address', from.address)}

        { hash && renderField('State', state, styles.half) }
        { hash && renderField('Confirmations', confirmations, styles.half) }
        { renderField('Concept', concept) }
        { hash && renderField('Hash', hash) }
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
