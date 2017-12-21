import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, Linking, StatusBar, Text, Vibration, View } from 'react-native';
import { connect } from 'react-redux';
import { Logo } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { FingerprintService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import { Fingerprint, NumKeyboard, Pin } from './components';
import styles from './Lock.style';

const { DEV, IS_DEVICE, SOHOBASE_SUPPORT } = C;
const { COLOR } = THEME;

const BACKSPACE = 'backspace';
const HELP = 'help';

const onHelp = () => Linking.openURL(`mailto:${SOHOBASE_SUPPORT}?subject=Help&body=body`);

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
    const { props: { i18n } } = this;

    if (await FingerprintService.isEnrolled()) {
      this.setState({ hasFingerprint: true });
      if (await FingerprintService.authenticate(i18n.USE_FINGERPRINT)) {
        FingerprintService.cancel();
        this._onSuccess();
      }
    }
  }

  _onPress(key) {
    if (key === HELP) {
      onHelp();
    } else if (key === BACKSPACE) {
      this._onBackspace();
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

  _onSuccess() {
    this.props.navigation.navigate('Main');
  }

  render() {
    const {
      _onFingerprint, _onPress,
      props: { device, i18n },
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
          <Pin animation={animation} pin={pin} />
          { !device.pin && <Text style={styles.hint}>{i18n.SET_PIN_CODE}</Text> }
        </View>
        <NumKeyboard onPress={_onPress} onHelp={onHelp} />
        { hasFingerprint && <Fingerprint onSuccess={_onFingerprint} /> }
      </View>
    );
  }
}

Lock.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  updateDevice: func,
};

Lock.defaultProps = {
  updateDevice() {},
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lock);
