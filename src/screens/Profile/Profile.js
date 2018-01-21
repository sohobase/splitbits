import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import { Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DevicesList } from '../../containers';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import styles from './Profile.style';

const { COLOR, QR_SIZE } = THEME;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
  }

  async _onRefresh() {
    const { props: { updateDevice } } = this;

    this.setState({ refreshing: true });
    await DeviceService.state().then(updateDevice);
    this.setState({ refreshing: false });
  }

  render() {
    const {
      _onRefresh,
      props: { device: { id }, i18n, navigation },
      state: { refreshing },
    } = this;

    return (
      <View style={styles.screen}>
        <Header
          buttonRight={{ icon: 'addDevice', onPress: () => navigation.navigate('Friends') }}
          navigation={navigation}
          tintColor={COLOR.TEXT_DEFAULT}
          title={i18n.FRIENDS}
        />
        <Motion animation="bounceInUp" delay={400}>
          <View style={[STYLE.CENTERED, styles.summary]}>
            <QRCode value={id} size={QR_SIZE} />
            <Text style={styles.hint}>{i18n.PROFILE_QR}</Text>
          </View>
          <DevicesList onRefresh={_onRefresh} refreshing={refreshing} style={styles.friends} />
        </Motion>
      </View>
    );
  }
}

Profile.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.DEVICE).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
};

Profile.defaultProps = {
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
