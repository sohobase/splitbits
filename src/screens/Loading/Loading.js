import { func } from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { updateCurrenciesAction, updateDeviceAction, updateWalletAction } from '../../store/actions';
import { Logo } from '../../components';
import { STYLE, THEME } from '../../config';
import { CurrencyService, DeviceService, WalletService } from '../../services';
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
    const { dispatch } = store;
    const { wallets = [] } = store.getState();
    const ids = wallets.length > 0 ? wallets.map(({ id }) => id) : [];

    await Promise.all([
      CurrencyService.list().then(value => dispatch(updateCurrenciesAction(value))),
      DeviceService.state().then(value => dispatch(updateDeviceAction(value))),
      WalletService.state({ ids })
        .then((values = []) => values.forEach(wallet => dispatch(updateWalletAction(wallet)))),
    ]);
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
        <StatusBar backgroundColor={COLOR.PRIMARY} barStyle="light-content" />
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
