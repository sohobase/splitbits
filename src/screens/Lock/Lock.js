import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, StatusBar, Text, Vibration, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Icon, Logo, Touchable } from '../../components';
import { C, SHAPE, STYLE, TEXT, THEME } from '../../config';
import { CurrenciesService, DeviceService, FingerprintService } from '../../services';
import { updateCurrenciesAction, updateDeviceAction } from '../../store/actions';
import styles from './Lock.style';

const { DEV, IS_DEVICE } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const { EN: { SET_PIN_CODE, USE_FINGERPRINT } } = TEXT;
const { COLOR } = THEME;

const BACKSPACE = 'backspace';
const HELP = 'help';
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, HELP, 0, BACKSPACE];

class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFingerprint: false,
      pin: undefined,
      wrong: false,
    };

    this._onBackspace = this._onBackspace.bind(this);
    this._onFingerprint = this._onFingerprint.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onSuccess = this._onSuccess.bind(this);

    if (DEV && !IS_DEVICE) this._onSuccess();
  }

  componentWillMount() {
    this._onFingerprint();
    BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
  }

  async _onFingerprint() {
    if (await FingerprintService.isEnrolled()) {
      this.setState({ hasFingerprint: true });
      if (await FingerprintService.authenticate(USE_FINGERPRINT)) {
        FingerprintService.cancel();
        this._onSuccess();
      }
    }
  }

  _onPress(key) {
    if ([BACKSPACE, HELP].includes(key)) {
      this[(key === BACKSPACE) ? '_onBackspace' : '_onHelp']();
    } else {
      let { pin = '' } = this.state;
      pin = `${pin}${key}`;
      if (pin.length <= 4) this.setState({ pin, wrong: false });

      if (pin.length === 4) {
        const { _onSuccess, props: { device, updateDevice } } = this;

        if (!device.pin || pin === device.pin) {
          if (!device.pin) updateDevice({ pin });
          _onSuccess();
        } else {
          setTimeout(() => {
            this.setState({ pin: '', wrong: true });
            Vibration.vibrate(500);
          }, 250);
        }
      }
    }
  }

  _onBackspace() {
    const { pin = '' } = this.state;
    if (pin.length > 0) this.setState({ pin: pin.slice(0, -1) || '' });
  }

  _onHelp() {
    // @TODO: Link to a website.
  }

  async _onSuccess() {
    const { props: { navigation: { navigate }, updateCurrencies, updateDevice } } = this;
    await Promise.all([
      CurrenciesService.list().then(updateCurrencies),
      DeviceService.state().then(updateDevice),
    ]);

    navigate('Main');
  }

  render() {
    const {
      _onFingerprint, _onPress,
      props: { device },
      state: { hasFingerprint, pin, wrong },
    } = this;
    let animation;
    if (!pin) animation = 'bounceInDown';
    if (wrong) animation = 'shake';

    return (
      <View style={[STYLE.SCREEN, STYLE.COL, styles.screen]}>
        <StatusBar backgroundColor={COLOR.PRIMARY} barStyle="light-content" />
        <View style={[STYLE.CENTERED, styles.header]}>
          <Logo motion={{ animation: 'bounceInDown' }} />
          <Motion animation={animation} delay={100} style={styles.pin}>
            <View style={STYLE.ROW}>
              <View style={[styles.code, (pin && pin.length >= 1 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 2 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 3 && styles.codeActive)]} />
              <View style={[styles.code, (pin && pin.length >= 4 && styles.codeActive)]} />
            </View>
          </Motion>
          { !device.pin && <Text style={styles.hint}>{SET_PIN_CODE}</Text> }
        </View>
        <Motion animation="bounceInUp" delay={200}>
          <View style={[STYLE.ROW, styles.padLock]}>
            { KEYS.map(key => (
              <Touchable key={key} onPress={() => _onPress(key)} raised style={[STYLE.CENTERED, styles.keyPad]}>
                { [BACKSPACE, HELP].includes(key)
                  ? <Icon value={key} style={styles.icon} />
                  : <Text style={styles.number}>{key}</Text>
                }
              </Touchable>))}
          </View>
        </Motion>
        { hasFingerprint &&
          <Motion animation="bounceInUp" delay={400}>
            <Touchable raised onPress={_onFingerprint}>
              <View style={[STYLE.ROW, STYLE.CENTERED, styles.fingerPrint]}>
                <Icon value="fingerprint" style={[styles.icon, styles.iconFingerprint]} />
                <Text style={styles.hint}>{USE_FINGERPRINT}</Text>
              </View>
            </Touchable>
          </Motion> }
      </View>
    );
  }
}

Lock.propTypes = {
  device: shape(DEVICE),
  navigation: shape(NAVIGATION),
  updateCurrencies: func,
  updateDevice: func,
};

Lock.defaultProps = {
  device: {},
  navigation: undefined,
  updateCurrencies() {},
  updateDevice() {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateCurrencies: currencies => currencies && dispatch(updateCurrenciesAction(currencies)),
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lock);
