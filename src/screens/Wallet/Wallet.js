import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Wallet.style';

class Wallet extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Wallet',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Wallet.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Wallet.defaultProps = {
  navigation: undefined,
};

export default Wallet;
