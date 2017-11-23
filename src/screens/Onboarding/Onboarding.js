import { shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { SHAPE, STYLE, TEXT, THEME } from '../../config';
import { Button } from '../../components';
import { ModalWalletNew } from '../../containers';
import { Slide } from './components';
import styles from './Onboarding.style';

const { NAVIGATION } = SHAPE;
const { COLOR } = THEME;
const { EN: { NEXT, SKIP, START } } = TEXT;
const SLIDES = 5;

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modal: false,
    };
    this._onNext = this._onNext.bind(this);
    this._onSkip = this._onSkip.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  componentWillMount() {
    // this.props.navigation.navigate('Main');
  }

  _onNext() {
    const { swipper } = this;
    swipper.scrollBy(1);
  }

  _onSkip() {
    const { swipper, state: { index } } = this;
    swipper.scrollBy(SLIDES - (index + 1));
  }

  _onSuccess() {
    const { _onWallet, props: { navigation } } = this;

    _onWallet();
    navigation.navigate('Main');
  }

  _onSwipe(event, { index }) {
    this.setState({ index });
  }

  _onWallet() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const {
      _onNext, _onSwipe, _onSkip, _onWallet, _onSuccess, state: { index, modal },
    } = this;

    return (
      <View style={STYLE.SCREEN}>
        <Swiper
          ref={(c) => { this.swipper = c; }}
          bounces
          dotStyle={STYLE.SWIPER_DOT}
          activeDotStyle={STYLE.SWIPER_DOT_ACTIVE}
          loop={false}
          onMomentumScrollEnd={_onSwipe}
        >
          <Slide caption="Welcome" />
          <Slide caption="Feature Number 1" />
          <Slide caption="Feature Number 2" backgroundColor={COLOR.ACCENT} />
          <Slide caption="Feature Number 3" backgroundColor={COLOR.TEXT_DEFAULT} />
          <Slide caption="Your wallet">
            <Button accent caption="Create your first wallet" onPress={_onWallet} style={styles.button} />
          </Slide>
        </Swiper>

        <Button
          caption={SKIP.toUpperCase()}
          captionStyle={styles.optionCaption}
          onPress={_onSkip}
          raised
          style={[styles.option, styles.left]}
        />
        <Button
          captionStyle={styles.optionCaption}
          caption={NEXT.toUpperCase()}
          disabled={(index + 1) === SLIDES}
          onPress={_onNext}
          raised
          style={[styles.option, styles.right]}
        />

        <ModalWalletNew visible={modal} onClose={_onWallet} onSuccess={_onSuccess} />
      </View>
    );
  }
}

Onboarding.propTypes = {
  navigation: shape(NAVIGATION),
};

Onboarding.defaultProps = {
  navigation: undefined,
};

export default Onboarding;
