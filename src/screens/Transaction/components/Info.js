import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Linking, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE } from '../../../config';
import { Avatar, Input, Touchable } from '../../../components';
import { DateService, TransactionService } from '../../../services';
import { updateTransactionsAction } from '../../../store/actions';
import styles from './Info.style';

const { BLOCKCHAIN_EXPLORER_URL } = C;
let timeout;

const Field = ({ caption, value, style }) => ( //eslint-disable-line
  <View style={[STYLE.LIST_ITEM, style]}>
    <Text style={STYLE.LABEL}>{caption}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const AddressField = ({ value, image, title }) => ( //eslint-disable-line
  <View style={[STYLE.LIST_ITEM, STYLE.ROW]}>
    <Avatar value={image} style={styles.avatar} />
    <View>
      <Text style={[styles.value, styles.title]}>{title}</Text>
      <Text style={STYLE.LABEL}>{value}</Text>
    </View>
  </View>
);

class TransactionInfo extends Component {
  constructor(props) {
    super(props);
    this._onConcept = this._onConcept.bind(this);
  }

  _onConcept(concept) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const { updateTransaction, item: { id } } = this.props;
      TransactionService.update(id, { concept }).then(updateTransaction);
    }, 1000);
  }

  render() {
    const {
      _onConcept,
      props: {
        devices,
        i18n,
        item: {
          confirmations = 0, coin, concept, createdAt, from, hash, payment, state, to,
        },
      },
    } = this;
    const device = devices.find(({ id }) => id === from.device || id === to.device);
    const isTransfer = from.device === to.device;
    const address = payment || isTransfer ? to.address : from.address;

    return (
      <Motion animation="bounceInUp" delay={500}>
        <View style={styles.container}>
          { isTransfer && <Field caption={i18n.FROM} value={from.address} /> }
          { device
            ? <AddressField image={device.image} title={device.name} value={address} />
            : <Field caption={isTransfer ? i18n.TO : i18n.ADDRESS} value={address} /> }
          { hash && <Field caption={i18n.STATE} value={state} style={styles.half} /> }
          { hash && <Field caption={i18n.CONFIRMATIONS} value={confirmations} style={styles.half} /> }
          { concept
            ? <Field caption={i18n.CONCEPT} value={concept} />
            :
            <Input
              onChangeText={_onConcept}
              placeholder={`${i18n.CONCEPT}...`}
              style={[STYLE.LIST_ITEM, styles.input]}
            /> }
          { hash &&
            <Touchable onPress={() => Linking.openURL(`${BLOCKCHAIN_EXPLORER_URL}/${coin}/${hash}`)}>
              <View style={STYLE.LIST_ITEM}>
                <Text style={STYLE.LABEL}>{i18n.HASH}</Text>
                <Text style={styles.value}>{hash}</Text>
              </View>
            </Touchable>}
          <Field caption={i18n.DATE} value={DateService.locale(createdAt)} />
        </View>
      </Motion>
    );
  }
}

TransactionInfo.propTypes = {
  devices: arrayOf(shape(SHAPE.DEVICE)),
  i18n: shape(SHAPE.I18N).isRequired,
  item: shape(SHAPE.TRANSACTION),
  updateTransaction: func,
};

TransactionInfo.defaultProps = {
  devices: [],
  item: {},
  updateTransaction() {},
};

const mapStateToProps = ({ currencies, device: { currency, devices }, i18n }) => ({
  currencies: currencies[currency],
  devices,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  updateTransaction: tx => tx && dispatch(updateTransactionsAction([tx])),
});


export default connect(mapStateToProps, mapDispatchToProps)(TransactionInfo);
