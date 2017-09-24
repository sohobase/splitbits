import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Settings.style';

class Settings extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Settings',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Settings.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Settings.defaultProps = {
  navigation: undefined,
};

export default Settings;
