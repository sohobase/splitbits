import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Icon, Touchable } from '../../components';
import { SHAPE, STYLE } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './Lock.style';

const asset = require('../../../assets/app-brandname.png');

const { DEVICE, NAVIGATION } = SHAPE;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: '',
      fingerprint: undefined,
    };
    this._onPress = this._onPress.bind(this);
  }

  _onPress(number) {
    const { navigation: { navigate } } = this.props;
    let { pin } = this.state;

    pin = `${pin}${number}`;
    if (pin.length < 4) return this.setState({ pin });
    if (pin !== '1980') return this.setState({ pin: '' });
    navigate('Main');
  }

  render() {
    const { _onPress, state: { pin: { length } } } = this;

    return (
      <View style={[STYLE.SCREEN, STYLE.COL, styles.screen]}>
        <View style={[STYLE.CENTERED, styles.header]}>
          <Image style={styles.brandname} source={asset} />
          <View style={STYLE.ROW}>
            <View style={[styles.code, (length >= 1 && styles.codeActive)]} />
            <View style={[styles.code, (length >= 2 && styles.codeActive)]} />
            <View style={[styles.code, (length >= 3 && styles.codeActive)]} />
            <View style={[styles.code, (length >= 4 && styles.codeActive)]} />
          </View>
        </View>
        <View style={[STYLE.ROW, styles.padLock]}>
          { NUMBERS.map(number => (
            <Touchable
              activeOpacity={0.1}
              key={number}
              onPress={() => _onPress(number)}
              style={STYLE.CENTERED}
            >
              <Text style={styles.keyPad}>{number}</Text>
            </Touchable>))}
        </View>
        <View style={[STYLE.ROW, STYLE.CENTERED, styles.fingerPrint]}>
          <Icon value="fingerprint" style={styles.icon} />
          <Text style={styles.hint}>Use fingerprint to unlock</Text>
        </View>
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
