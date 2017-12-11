import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { SHAPE, STYLE, TEXT } from '../../../config';
import { Avatar, Input } from '../../../components';
import { DateService } from '../../../services';
import styles from './Info.style';

const { DEVICE, TRANSACTION } = SHAPE;
const {
  EN: {
    ADDRESS, CONCEPT, CONFIRMATIONS, DATE, HASH, STATE,
  },
} = TEXT;

const onConcept = (value) => {
  console.log('onChange', value);
};

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
            renderField(ADDRESS, from.address)}

        { hash && renderField(STATE, state, styles.half) }
        { hash && renderField(CONFIRMATIONS, confirmations, styles.half) }
        { !concept
          ? renderField(CONCEPT, concept)
          : <Input onChangeText={onConcept} placeholder={`${CONCEPT}...`} style={[STYLE.LIST_ITEM, styles.input]} /> }
        { hash && renderField(HASH, hash) }
        { renderField(DATE, DateService.locale(createdAt)) }
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
