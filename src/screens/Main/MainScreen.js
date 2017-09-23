import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ButtonIcon } from '../../components';
import { STYLE } from '../../config';
import styles from './MainScreen.style';

class Main extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Main',
      // headerRight: <ButtonIcon icon="add" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    return (
      <View style={[STYLE.SCREEN, styles.main]}>
        <Button caption="Button" />
        <Button accent caption="Button accent" />
      </View>
    );
  }
}

export default Main;
