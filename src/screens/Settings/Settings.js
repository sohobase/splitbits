import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import styles from './Settings.style';

const { COLOR } = THEME;

class Settings extends Component {
  static navigationOptions({ navigation: { navigate } }) {
    return {
      title: 'Settings',
      // headerRight: <Icon value="search" onPress={() => navigate('Currencies')} />,
    };
  }

  render() {
    const { props: { device, navigation } } = this;

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header
          title="Settings"
          navigation={navigation}
          _buttonRight={{ icon: 'add' }}
          tintColor={COLOR.TEXT_DEFAULT}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
};

Settings.defaultProps = {
  device: {},
  navigation: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Settings);
