import { func } from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../../store/actions';
import { Logo } from '../../components';
import { STYLE, THEME } from '../../config';
import { StateService } from '../../services';
import { initialize } from '../../store';
import styles from './Loading.style';

const { COLOR } = THEME;

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
    };
  }

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
    this.setState({ processing: false });
    setTimeout(() => { onLoad({ store }); }, 500);
  }

  render() {
    const { processing } = this.state;
    const motion = processing
      ? { animation: 'flash', duration: 5000, iterationCount: 'infinite' }
      : { animation: 'bounceOutUp' };

    return (
      <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
        <StatusBar backgroundColor={COLOR.PRIMARY} barStyle="dark-content" />
        <Logo motion={motion} />
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
