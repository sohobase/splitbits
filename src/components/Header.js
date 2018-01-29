import { array, node, number, object, oneOfType, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, StatusBar, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';

import { SHAPE, STYLE, THEME } from '../config';
import Button from './Button';
import styles from './Header.style';

const { BUTTON, NAVIGATION } = SHAPE;
const { COLOR } = THEME;

class Header extends Component {
  constructor(props) {
    super(props);
    this._onBack = this._onBack.bind(this);
  }

  componentWillMount() {
    const { _onBack } = this;
    BackHandler.addEventListener('hardwareBackPress', _onBack);
  }

  componentWillUnmount() {
    const { _onBack } = this;
    BackHandler.removeEventListener('hardwareBackPress', _onBack);
  }

  _onBack() {
    const { navigation } = this.props;
    if (navigation) navigation.goBack();
    return navigation !== undefined;
  }

  render() {
    const {
      _onBack,
      props: {
        animation, buttonRight, children, navigation, style, tintColor, title,
      },
    } = this;

    return (
      <View style={[STYLE.ROW, styles.header, style]}>
        <StatusBar
          animated
          backgroundColor={tintColor !== COLOR.WHITE ? COLOR.WHITE : COLOR.PRIMARY}
          barStyle={tintColor !== COLOR.WHITE ? 'dark-content' : 'light-content'}
        />
        { navigation &&
          <Button
            motion={{ animation, delay: 100 }}
            icon="arrowBack"
            onPress={_onBack}
            raised
            style={styles.button}
            captionStyle={{ tintColor }}
          /> }
        <Motion animation={animation} delay={200} style={styles.content}>
          <View style={STYLE.CENTERED}>
            { title && <Text style={[styles.title, (tintColor && { color: tintColor })]}>{title}</Text> }
            { children }
          </View>
        </Motion>
        { navigation &&
          <Button
            motion={{ animation, delay: 300 }}
            {...buttonRight}
            raised
            style={styles.button}
            captionStyle={{ tintColor }}
          /> }
      </View>
    );
  }
}

Header.propTypes = {
  animation: string,
  buttonRight: shape(BUTTON),
  children: oneOfType([array, node]),
  navigation: shape(NAVIGATION),
  style: oneOfType([array, number]),
  tintColor: oneOfType([string, object]),
  title: string,
};

Header.defaultProps = {
  animation: 'bounceInDown',
  buttonRight: undefined,
  navigation: undefined,
  children: undefined,
  style: [],
  tintColor: COLOR.WHITE,
  title: undefined,
};

export default Header;
