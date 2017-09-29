import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from '../../components';
import { SHAPE, STYLE } from '../../config';
import styles from './Transaction.style';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header title="Transaction" navigation={navigation} />
        </View>
        <View style={STYLE.LAYOUT_BOTTOM} />
      </View>
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
