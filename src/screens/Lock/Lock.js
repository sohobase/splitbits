import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, Vibration, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Icon, Touchable } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { updateDeviceAction } from '../../store/actions';
import styles from './Lock.style';

const { LOGO } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fingerprint: undefined, // @TODO: v1.1 must unlock with fin
      pin: undefined,
      wrong: false,
    };
    this._onPress = this._onPress.bind(this);
  }

  _onPress(number) {
    let { pin = '' } = this.state;
    pin = `${pin}${number}`;
    if (pin.length <= 4) this.setState({ pin, wrong: false });

    if (pin.length === 4) {
      const { device, navigation: { navigate } } = this.props;

      setTimeout(() => {
        if (pin !== '1980') {
          this.setState({ pin: '', wrong: true });
          return Vibration.vibrate(500);
        }
        return navigate('Main');
      }, 250);
    }
  }

  render() {
    const { _onPress, props: { device }, state: { pin, wrong } } = this;
    let animation;
    if (!pin) animation = 'bounceInDown';
    if (wrong) animation = 'shake';

    return (
      <View style={[STYLE.SCREEN, STYLE.COL, styles.screen]}>
        <View style={[STYLE.CENTERED, styles.header]}>
          <Motion animation="bounceInDown">
            <Image style={styles.brandname} source={LOGO} />
          </Motion>
          <Motion animation={animation} delay={100}>
            <View style={STYLE.ROW}>
              <View style={[styles.code, (pin && pin.length >= 1 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 2 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 3 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 4 && styles.codeActive)]} />
            </View>
          </Motion>
        </View>
        <Motion animation="bounceInUp" delay={200}>
          <View style={[STYLE.ROW, styles.padLock]}>
            { NUMBERS.map(number => (
              <Touchable
                key={number}
                onPress={() => _onPress(number)}
                raised
                style={STYLE.CENTERED}
              >
                <Text style={styles.keyPad}>{number}</Text>
              </Touchable>))}
          </View>
        </Motion>
        <Motion animation="bounceInUp" delay={400}>
          <View style={[STYLE.ROW, STYLE.CENTERED, styles.fingerPrint]}>
            <Icon value="fingerprint" style={styles.icon} />
            <Text style={styles.hint}>Use fingerprint to unlock</Text>
          </View>
        </Motion>
      </View>
    );
  }
}

Lock.propTypes = {
  device: shape(DEVICE),
  navigation: shape(NAVIGATION),
  updateDevice: func,
};

Lock.defaultProps = {
  device: {},
  navigation: undefined,
  updateDevice() {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lock);
