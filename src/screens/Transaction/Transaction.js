import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Transaction.style';

class Transaction extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Transaction',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Transaction.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Transaction.defaultProps = {
  navigation: undefined,
};

export default Transaction;
