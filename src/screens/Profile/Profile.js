import { func } from 'prop-types';
import React, { Component } from 'react';
import { Flatlist, Image, Text, TextInput, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { updateDeviceAction } from '../../store/actions';
import { Button, Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import styles from './Profile.style';

const { COLOR } = THEME;
let timeout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.device.name };
    this._onImage = this._onImage.bind(this);
    this._onName = this._onName.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  _onSave() {
    const { navigation: { goBack } } = this.props;
    DeviceService.update();
    goBack();
  }

  _onImage(image) {
    const { updateDevice } = this.props;

    console.log('@TODO: Upload image');
  }

  _onName(name) {
    const { updateDevice } = this.props;
    this.setState({ name });

    clearTimeout(timeout);
    timeout = setTimeout(() => { DeviceService.update({ name }, updateDevice); }, 1000);
  }

  render() {
    const { _onImage, _onName, _onSave, props: { device, navigation }, state: { name } } = this;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header
            title="Profile"
            navigation={navigation}
            buttonRight={{ icon: 'add', onPress: _onSave }}
          />
          <Animatable animation="bounceIn" delay={600} style={styles.preview}>
            <View style={[STYLE.CENTERED, styles.preview]}>
              <View>
                <Image source={{ url: device.image }} style={styles.image} />
                <Button accent circle icon="camera" onPress={_onImage} style={styles.buttonCamera} />
              </View>
              <View style={styles.qr}>
                <QRCode value={device.id} size={THEME.AVATAR_SIZE / 3} fgColor={COLOR.PRIMARY} bgColor={COLOR.WHITE} />
              </View>
              <TextInput
                autoFocus={!name || name.length === 0}
                onChangeText={_onName}
                placeholder="Choose a name..."
                style={[STYLE.INPUT_HIGHLIGHT, styles.input]}
                value={name}
              />
            </View>
          </Animatable>
        </View>

        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          <Animatable animation="bounceInUp" delay={600}>
            { (1 === 2) && <Flatlist /> }
          </Animatable>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
  updateDevice: func,
};

Profile.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
