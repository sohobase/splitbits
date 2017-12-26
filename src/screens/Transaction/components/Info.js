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

const renderField = (caption, value, style) => (
  <View style={[STYLE.LIST_ITEM, style]}>
    <Text style={STYLE.LABEL}>{caption}</Text>
    <Text style={styles.value}>{value}</Text>
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
          confirmations = 0, coin, concept, createdAt, from, hash, to, state,
        },
      },
    } = this;
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
                  { from.address && <Text style={STYLE.LABEL}>{from.address}</Text> }
                </View>
              </View>
            :
              renderField(i18n.ADDRESS, from.address)}

          { hash && renderField(i18n.STATE, state, styles.half) }
          { hash && renderField(i18n.CONFIRMATIONS, confirmations, styles.half) }
          { concept
            ? renderField(i18n.CONCEPT, concept)
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
          { renderField(i18n.DATE, DateService.locale(createdAt)) }
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
