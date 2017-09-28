import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { SHAPE, STYLE, THEME } from '../../config';
import { Button } from '../../components';
import { Slide } from './components';
import styles from './Onboarding.style';

const { COLOR } = THEME;
const MAX_INDEX = 3;

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this._onNext = this._onNext.bind(this);
    this._onSkip = this._onSkip.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
  }

  _onNext() {
    const { swipper } = this;
    swipper.scrollBy(1);
  }

  _onSkip(event) {
    const { navigation: { navigate }} = this.props;

    navigate('Main');
  }

  _onSwipe(event, { index }) {
    this.setState({ index });
  }

  render() {
    const { _onNext, _onSwipe, _onSkip } = this;
    const { index } = this.state;

    return (
      <View style={STYLE.SCREEN}>
        <Swiper
          ref={(c) => { this.swipper = c; }}
          bounces
          dotStyle={styles.dot}
          activeDotStyle={styles.dotActive}
          loop={false}
          onMomentumScrollEnd={_onSwipe}
        >
          <Slide />
          <Slide backgroundColor={COLOR.ACCENT} />
          <Slide _backgroundColor={COLOR.TEXT_DEFAULT} />
          <Slide />
        </Swiper>

        <Button
          disabled={index >= MAX_INDEX}
          captionStyle={styles.buttonCaption}
          caption="SKIP"
          onPress={_onSkip}
          raised
          style={[styles.button, styles.left]}
        />
        <Button
          caption="NEXT"
          captionStyle={styles.buttonCaption}
          disabled={index >= MAX_INDEX}
          onPress={_onNext}
          raised
          style={[styles.button, styles.right]}
        />
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
