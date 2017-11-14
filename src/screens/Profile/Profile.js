import React from 'react';
import { Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DevicesList } from '../../containers';
import styles from './Profile.style';

const { COLOR, QR_SIZE } = THEME;

const Profile = ({ device: { session }, navigation }) => (
  <View style={STYLE.SCREEN}>
    <View style={STYLE.LAYOUT_TOP}>
      <Header
        title="Profile"
        navigation={navigation}
        buttonRight={{ icon: 'add', onPress: () => navigation.navigate('Friends') }}
      />
      <Animatable animation="bounceIn" delay={400} style={styles.preview}>
        <View style={[STYLE.CENTERED, styles.preview]}>
          <QRCode value={session} size={QR_SIZE * 2} fgColor={COLOR.PRIMARY} bgColor={COLOR.WHITE} />
        </View>
      </Animatable>
      <Animatable animation="bounceIn" delay={600}>
        <Text style={styles.hint}>This QR will help your friends to find you easily.</Text>
      </Animatable>
    </View>
    <View style={STYLE.LAYOUT_BOTTOM}>
      <Animatable animation="bounceInUp" delay={500} style={styles.preview}>
        <DevicesList />
      </Animatable>
    </View>
  </View>
);

Profile.propTypes = {
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
};

Profile.defaultProps = {
  device: {},
  navigation: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Profile);
