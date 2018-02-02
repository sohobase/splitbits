import { func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';

import { Button, QRreader } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { ConnectionService, FingerprintService, TransactionService } from '../../services';
import { updateRecipientAction, updateTransactionsAction } from '../../store/actions';
import { AmountTransaction, ButtonSubmit, Recipient, Info } from './components';
import { submit } from './modules';
import styles from './Transaction.style';

const {
  CONNECTION: { WIFI }, FEES, SATOSHI, STATE: { REQUESTED }, TYPE: { SEND, REQUEST },
} = C;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item = {} } = props;

    this.state = {
      amount: item.amount,
      camera: false,
      concept: undefined,
      connection: undefined,
      feeType: FEES.REGULAR,
      hasFingerprint: false,
      unlock: true,
      processing: false,
    };
    this._onAddress = this._onAddress.bind(this);
    this._onAmount = this._onAmount.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onConcept = this._onConcept.bind(this);
    this._onFee = this._onFee.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  async componentWillMount() {
    const {
      props: {
        i18n, item: { state } = {}, type, updateRecipient,
      },
    } = this;
    updateRecipient();

    this.setState({ connection: await ConnectionService.get() });

    if (state || type === SEND) {
      const hasFingerprint = await FingerprintService.isEnrolled();
      this.setState({ hasFingerprint, unlock: !hasFingerprint });
      if (hasFingerprint && await FingerprintService.authenticate(i18n.USE_FINGERPRINT)) {
        FingerprintService.cancel();
        this.setState({ unlock: true });
      }
    }
  }

  _onAddress(address) {
    this.props.updateRecipient({ address });
    this.setState({ camera: false });
  }

  _onAmount(amount) {
    this.setState({ amount });
  }

  _onCamera() {
    this.setState({ camera: !this.state.camera });
  }

  async _onCancel() {
    const {
      item: { id }, navigation, updateTransactions, wallet,
    } = this.props;

    const transaction = await TransactionService.archive(id, wallet.id);
    if (transaction && transaction.id) {
      updateTransactions(transaction);
      navigation.goBack();
    }
  }

  _onConcept(concept) {
    this.setState({ concept });
  }

  _onFee(feeType) {
    this.setState({ feeType });
  }

  async _onSubmit() {
    this.setState({ processing: true });
    const transaction = await submit(this);
    if (transaction && transaction.id) {
      const { navigation, updateTransactions } = this.props;
      updateTransactions(transaction);
      this.setState({ processing: false });
      navigation.goBack();
    }
  }

  render() {
    const {
      _onAddress, _onAmount, _onCancel, _onCamera, _onConcept, _onFee, _onSubmit,
      props: {
        i18n, item, navigation, recipient, type, wallet,
      },
      state: {
        amount = 0, camera, concept, connection, feeType, hasFingerprint, unlock, processing,
      },
    } = this;
    const { coin } = wallet;
    const editable = !item;
    const amountProps = {
      coin, editable, fee: feeType, item, navigation, type, wallet,
    };
    const recipientProps = {
      concept, navigation, onCamera: _onCamera, onConcept: _onConcept, type, wallet,
    };

    const disabled =
      !unlock ||
      (editable && (!concept || !recipient || !amount)) ||
      (((type === REQUEST && item) || type === SEND) && wallet.balance < amount);

    return (
      <View style={STYLE.SCREEN}>
        <AmountTransaction {...amountProps} onAmount={_onAmount} onFee={_onFee} />
        <ScrollView style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          <View>
            { editable ? <Recipient {...recipientProps} /> : <Info item={item} /> }
            <View style={styles.buttons}>
              { (editable || (item.state === REQUESTED && wallet.address !== item.to.address)) &&
                <ButtonSubmit
                  amount={editable ? amount / SATOSHI : item.amount}
                  coin={coin}
                  disabled={disabled}
                  fingerprint={hasFingerprint}
                  item={item}
                  onPress={_onSubmit}
                  processing={processing}
                  type={type}
                /> }
              { !editable && !processing && item.state === REQUESTED &&
                <Button
                  caption={i18n.CANCEL_REQUEST}
                  motion={{ animation: 'bounceInUp', delay: 700 }}
                  onPress={_onCancel}
                  style={styles.buttonCancel}
                /> }
            </View>
            { editable && connection === WIFI &&
              <Motion animation="bounceIn" delay={700} style={styles.centered}>
                <Text style={[styles.caption, styles.error]}>{i18n.UNSECURED_CONNECTION}</Text>
              </Motion> }
          </View>
        </ScrollView>
        <QRreader active={camera} onClose={_onCamera} onRead={_onAddress} />
      </View>
    );
  }
}

Transaction.propTypes = {
  i18n: shape({}).isRequired,
  item: shape(SHAPE.TRANSACTION),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  recipient: shape(SHAPE.RECIPIENT),
  type: string.isRequired,
  updateRecipient: func.isRequired,
  updateTransactions: func.isRequired,
  wallet: shape(SHAPE.WALLET).isRequired,
};

Transaction.defaultProps = {
  item: undefined,
  recipient: undefined,
};

const mapStateToProps = ({ i18n, recipient }, props) => {
  const { item, type = REQUEST, wallet = {} } = props.navigation.state.params;

  return {
    i18n, item, recipient, type, wallet,
  };
};

const mapDispatchToProps = dispatch => ({
  updateRecipient: recipient => dispatch(updateRecipientAction(recipient)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
