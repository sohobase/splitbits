import { func } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { Logo } from '../../components';
import { STYLE } from '../../config';
import { initialize } from '../../store';
import styles from './Loading.style';

class Loading extends Component {
  async componentWillMount() {
    this.props.onLoad({ store: await initialize() });
  }

  render() {
    return (
      <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
        <Animatable animation="bounceIn" duration={1000}>
          <Logo />
        </Animatable>
      </View>
    );
  }
}

Loading.propTypes = {
  onLoad: func,
};

Loading.defaultProps = {
  onLoad: undefined,
};

export default Loading;
