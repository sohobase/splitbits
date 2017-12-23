import { Util } from 'expo';
import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { Button } from '../../components';
import { ModalWalletNew } from '../../containers';
import { updateDeviceAction } from '../../store/actions';
import { Slide } from './components';
import styles from './Onboarding.style';

const { LANGUAGES } = C;
const {
  ACCENT, BLUE, RED, PINK,
} = THEME.COLOR;
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

  async componentWillMount() {
    const { props: { updateDevice } } = this;
    const language = (await Util.getCurrentLocaleAsync()).toUpperCase();

    updateDevice({ language: LANGUAGES[language] ? language : 'EN' });
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
      _onNext, _onSwipe, _onSkip, _onWallet, _onSuccess,
      props: { i18n },
      state: { index, modal },
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
          <Slide caption={i18n.CAPTION.WELCOME} image="rocket" hint={i18n.HINT.WELCOME} />
          <Slide backgroundColor={ACCENT} caption={i18n.CAPTION.PRIVATE_KEYS} image="key" hint={i18n.HINT.PRIVATE_KEYS} />
          <Slide backgroundColor={PINK} caption={i18n.CAPTION.NETWORK} image="network" hint={i18n.HINT.NETWORK} />
          <Slide backgroundColor={BLUE} caption={i18n.CAPTION.PRIVACY} image="privacy" hint={i18n.HINT.PRIVACY} />
          <Slide backgroundColor={RED} caption={i18n.CAPTION.EXCHANGE} image="exchange" hint={i18n.HINT.EXCHANGE} />
          <Slide caption={i18n.CAPTION.WALLET} image="wallet" hint={i18n.HINT.WALLET}>
            <Button accent caption={i18n.CREATE_FIRST_WALLET} onPress={_onWallet} style={styles.button} />
          </Slide>
        </Swiper>
        <View style={[STYLE.ROW, styles.options]}>
          <Button
            caption={i18n.SKIP.toUpperCase()}
            captionStyle={styles.option}
            disabled={optionDisabled}
            onPress={_onSkip}
            raised
            style={styles.left}
          />
          <Button
            caption={i18n.NEXT.toUpperCase()}
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
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  updateDevice: func,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
  updateDevice() {},
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
