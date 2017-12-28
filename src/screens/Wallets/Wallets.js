import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { WalletItem } from '../../containers';
import { updateRecipientAction } from '../../store/actions';
import styles from './Wallets.style';

const { COLOR } = THEME;

class Wallets extends Component {
  constructor(props) {
    super(props);
    this._onItem = this._onItem.bind(this);
  }

  _onItem(wallet) {
    const { navigation, updateRecipient } = this.props;
    navigation.goBack();
    updateRecipient({ wallet });
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
  updateRecipient: func.isRequired,
};

Wallets.defaultProps = {
  wallets: [],
};

const mapStateToProps = ({ wallets, i18n }, props) => {
  const { wallet = {} } = props.navigation.state.params;

  return {
    wallets: wallets.filter(({ id, coin }) => id !== wallet.id && coin === wallet.coin),
    i18n,
  };
};

const mapDispatchToProps = dispatch => ({
  updateRecipient: recipient => dispatch(updateRecipientAction(recipient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
