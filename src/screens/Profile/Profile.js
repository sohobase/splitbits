import React, { Component } from 'react';
import { View } from 'react-native';
import { SHAPE, STYLE } from '../../config';
import styles from './Profile.style';

class Profile extends Component {
  static navigationOptions() {
    return {
      title: 'Profile',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.screen]} />
    );
  }
}

Profile.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Profile.defaultProps = {
  navigation: undefined,
};

export default Profile;
