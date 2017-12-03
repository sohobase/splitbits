import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import { Avatar } from '../../../components';
import styles from './Info.style';

const { DEVICE, TRANSACTION } = SHAPE;

const renderField = (caption, value, style) => (
  <View style={[STYLE.LIST_ITEM, style]}>
    <Text style={styles.label}>{caption}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const TransactionInfo = (props) => {
  const {
    devices,
    item: {
      confirmations = 0, concept, createdAt, from, hash, to, state,
    },
  } = props;
  const device = devices.find(({ id }) => id === from.device || id === to.device);

  return (
    <Motion animation="bounceInUp" delay={500}>
      <View style={styles.container}>
        { device
          ?
            <View style={[STYLE.ROW, STYLE.LIST_ITEM]}>
              <Avatar value={device.image} style={styles.avatar} />
              <View>
                <Text style={[styles.value, styles.title]}>{device.name}</Text>
                { from.address && <Text style={styles.label}>{from.address}</Text> }
              </View>
            </View>
          :
            renderField('Address', from.address)}

        { hash && renderField('State', state, styles.half) }
        { hash && renderField('Confirmations', confirmations, styles.half) }
        { concept && renderField('Concept', concept) }
        { hash && renderField('Hash', hash) }
        { renderField('Date', createdAt) }
      </View>
    </Motion>
  );
};

TransactionInfo.propTypes = {
  devices: arrayOf(shape(DEVICE)),
  item: shape(TRANSACTION),
};

TransactionInfo.defaultProps = {
  devices: [],
  item: {},
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies: currencies[device.currency],
  devices: device.devices,
});

export default connect(mapStateToProps)(TransactionInfo);
