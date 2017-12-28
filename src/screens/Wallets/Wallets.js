import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
// import { DeviceService } from '../../services';
// import { selectDeviceAction, updateDeviceAction } from '../../store/actions';
import { WalletItem } from './components';
import styles from './Wallets.style';

const { COLOR } = THEME;

class Wallets extends Component {
  constructor(props) {
    super(props);
    this._onItem = this._onItem.bind(this);
  }

  _onItem(walletId) {
    const { navigation } = this.props;
    navigation.goBack();
    // selectWallet(walletId);
  }

  render() {
    const { _onItem, props: { i18n, navigation, wallets } } = this;

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header
          navigation={navigation}
          style={STYLE.HEADER_HIGHLIGHT}
          tintColor={COLOR.TEXT_DEFAULT}
          title={i18n.CHOOSE_WALLET}
        />
        <FlatList
          data={wallets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <WalletItem data={item} onPress={_onItem} />}
        />
      </View>
    );
  }
}

Wallets.propTypes = {
  wallets: arrayOf(shape(SHAPE.WALLET)),
  i18n: shape(SHAPE.DEVICE).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  // selectDevice: func.isRequired,
  // updateDevice: func.isRequired,
};

Wallets.defaultProps = {
  wallets: [],
};

const mapStateToProps = ({ wallets, i18n }, { wallet = {} }) => ({
  // wallets: wallets.filter(({ id, coin }) => id !== wallet.id && coin === wallet.coin),
  wallets,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  // selectDevice: deviceId => dispatch(selectDeviceAction(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
