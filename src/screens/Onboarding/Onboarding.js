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
const {
  EN: {
    NEXT, SKIP, CAPTION, HINT,
  },
} = TEXT;
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

  _onNext() {
    const { swipper } = this;
    swipper.scrollBy(1);
  }

  _onSkip() {
    const { swipper, state: { index } } = this;
    swipper.scrollBy(SLIDES - index);
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
    const optionDisabled = (index + 1) > SLIDES;

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
          <Slide caption={CAPTION.WELCOME} image="rocket" hint={HINT.WELCOME} />
          <Slide backgroundColor={COLOR.ACCENT} caption={CAPTION.PRIVATE_KEYS} image="key" hint={HINT.PRIVATE_KEYS} />
          <Slide backgroundColor={COLOR.PINK} caption={CAPTION.NETWORK} image="network" hint={HINT.NETWORK} />
          <Slide backgroundColor={COLOR.BLUE} caption={CAPTION.PRIVACY} image="privacy" hint={HINT.PRIVACY} />
          <Slide backgroundColor={COLOR.RED} caption={CAPTION.EXCHANGE} image="exchange" hint={HINT.EXCHANGE} />
          <Slide caption={CAPTION.WALLET} image="wallet" hint={HINT.WALLET}>
            <Button accent caption="Create your first wallet" onPress={_onWallet} style={styles.button} />
          </Slide>
        </Swiper>
        <View style={[STYLE.ROW, styles.options]}>
          <Button
            caption={SKIP.toUpperCase()}
            captionStyle={styles.option}
            disabled={optionDisabled}
            onPress={_onSkip}
            raised
            style={styles.left}
          />
          <Button
            caption={NEXT.toUpperCase()}
            captionStyle={styles.option}
            disabled={optionDisabled}
            onPress={_onNext}
            raised
            style={styles.right}
          />
        </View>
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
