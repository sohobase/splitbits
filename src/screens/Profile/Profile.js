import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { SHAPE, STYLE, THEME, TEXT } from '../../config';
import { DevicesList } from '../../containers';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './Profile.style';

const { DEVICE, NAVIGATION } = SHAPE;
const { COLOR, QR_SIZE } = THEME;
const { EN: { FRIENDS } } = TEXT;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
  }

  async _onRefresh() {
    const { props: { updateDevice } } = this;

    this.setState({ refreshing: true });
    updateDevice(await DeviceService.state());
    this.setState({ refreshing: false });
  }

  render() {
    const {
      _onRefresh,
      props: { device: { session }, navigation },
      state: { refreshing },
    } = this;

    return (
      <View style={styles.screen}>
        <Header
          buttonRight={{ icon: 'addDevice', onPress: () => navigation.navigate('Friends') }}
          navigation={navigation}
          tintColor={COLOR.TEXT_DEFAULT}
          title={FRIENDS}
        />
        <Motion animation="bounceInUp" delay={400}>
          <View style={[STYLE.CENTERED, styles.summary]}>
            <QRCode value={session} size={QR_SIZE} />
            <Text style={styles.hint}>This QR will help your friends to find you easily.</Text>
          </View>
          <DevicesList onRefresh={_onRefresh} refreshing={refreshing} />
        </Motion>
      </View>
    );
  }
}

Profile.propTypes = {
  device: shape(DEVICE),
  navigation: shape(NAVIGATION),
};

Profile.defaultProps = {
  device: {},
  navigation: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
