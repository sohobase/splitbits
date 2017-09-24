import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Activity.style';

class Activity extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Activity',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Activity.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Activity.defaultProps = {
  navigation: undefined,
};

export default Activity;
