import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { SHAPE, STYLE, THEME } from '../../config';
import { Button } from '../../components';
import { Slide, WalletModal } from './components';
import styles from './Onboarding.style';

const { COLOR } = THEME;
const MAX_INDEX = 3;

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, modal: true };
    this._onNext = this._onNext.bind(this);
    this._onSkip = this._onSkip.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  _onNext() {
    const { swipper } = this;
    swipper.scrollBy(1);
  }

  _onSkip() {
    const { navigation: { navigate } } = this.props;
    navigate('Main');
  }

  _onSwipe(event, { index }) {
    this.setState({ index });
  }

  _onWallet() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { _onNext, _onSwipe, _onSkip, _onWallet, state: { index, modal } } = this;

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
          <Slide>
            <Button
              accent
              caption="CREATE YOUR FIRST WALLET"
              onPress={_onWallet}
              style={styles.buttonWallet}
            />
          </Slide>

          <Slide />
          <Slide backgroundColor={COLOR.ACCENT} />
          <Slide _backgroundColor={COLOR.TEXT_DEFAULT} />

        </Swiper>

        <Button
          disabled={index >= MAX_INDEX}
          captionStyle={styles.buttonCaption}
          caption="SKIP"
          onPress={_onSkip}
          raised
          style={[styles.option, styles.left]}
        />
        <Button
          caption="NEXT"
          captionStyle={styles.optionCaption}
          disabled={index >= MAX_INDEX}
          onPress={_onNext}
          raised
          style={[styles.option, styles.right]}
        />

        <WalletModal visible={modal} onClose={_onWallet} />
      </View>
    );
  }
}

Onboarding.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Onboarding.defaultProps = {
  navigation: undefined,
};

export default Onboarding;
