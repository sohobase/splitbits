import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Friends.style';

class Friends extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Friends',
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Friends.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Friends.defaultProps = {
  navigation: undefined,
};

export default Friends;
