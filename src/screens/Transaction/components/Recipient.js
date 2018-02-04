import { bool, func, shape, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Icon, Input, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { DeviceItem, WalletItem } from '../../../containers';
import styles from './Recipient.style';

const { TYPE: { SEND } } = C;

const Recipient = ({
  concept, i18n, navigation: { navigate }, onCamera, onConcept, recipient = {}, support, type, wallet,
}) => (
  <View>
    <Input
      editable={onConcept !== undefined}
      onChangeText={onConcept}
      placeholder={`${i18n.ADD_NOTE}...`}
      style={[STYLE.ROW, STYLE.LIST_ITEM]}
      value={concept}
    />
    <Touchable onPress={() => !support && navigate('Friends', { selectMode: true })}>
      <View style={[STYLE.LIST_ITEM, STYLE.ROW]}>
        { support || recipient.device
          ? <DeviceItem data={recipient.device} style={styles.item} />
          : <Text style={styles.placeholder}>{`${i18n.CHOOSE_A_FRIEND}...`}</Text>
        }
        <Icon style={styles.icon} value="add" />
      </View>
    </Touchable>

    { !support && type === SEND &&
      <Touchable onPress={() => navigate('Wallets', { wallet })}>
        <View style={[STYLE.LIST_ITEM, STYLE.ROW]}>
          { recipient.wallet
            ? <WalletItem data={recipient.wallet} style={styles.item} />
            : <Text style={styles.placeholder}>{`...${i18n.CHOOSE_YOUR_WALLET}...`}</Text>
          }
          <Icon style={styles.icon} value="operations" />
        </View>
      </Touchable> }
    { !support && type === SEND &&
      <Touchable onPress={onCamera}>
        <View style={[STYLE.LIST_ITEM, STYLE.ROW]}>
          <Text style={!recipient.address ? styles.placeholder : styles.value}>
            {recipient.address || `...${i18n.USE_PUBLIC_ADDRESS}`}
          </Text>
          <Icon style={styles.icon} value="camera" />
        </View>
      </Touchable> }
  </View>
);

Recipient.propTypes = {
  concept: string,
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION),
  onCamera: func,
  onConcept: func,
  recipient: shape(SHAPE.RECIPIENT),
  support: bool,
  type: string,
  wallet: shape(SHAPE.WALLET).isRequired,
};

Recipient.defaultProps = {
  concept: undefined,
  navigation: undefined,
  onCamera() {},
  onConcept: undefined,
  recipient: undefined,
  support: false,
  type: undefined,
};

const mapStateToProps = ({ i18n, recipient }) => ({
  i18n, recipient,
});

export default connect(mapStateToProps)(Recipient);
