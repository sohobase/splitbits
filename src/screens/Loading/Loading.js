import { func } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../../store/actions';
import { Logo } from '../../components';
import { STYLE } from '../../config';
import { StateService } from '../../services';
import { initialize } from '../../store';
import styles from './Loading.style';

class Loading extends Component {
  async componentWillMount() {
    const { onLoad } = this.props;
    const store = await initialize();
    const { wallets: storeWallets } = store.getState();

    if (storeWallets.length > 0) {
      const response = await StateService.get(storeWallets.map(({ id }) => id));

      if (response) {
        const { currencies = {}, device = {}, wallets = [] } = response;
        store.dispatch(updateCurrenciesAction(currencies));
        store.dispatch(updateDeviceAction(device));
        wallets.forEach(wallet => store.dispatch(updateWalletAction(wallet)));
      }
    }

    onLoad({ store });
  }

  render() {
    return (
      <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
        <Animatable animation="bounceIn" duration={1000}>
          <Logo />
        </Animatable>
      </View>
    );
  }
}

Loading.propTypes = {
  onLoad: func,
};

Loading.defaultProps = {
  onLoad() {},
};

export default Loading;
