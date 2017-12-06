import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Button, Header, Input } from '../../components';
import { ModalCamera, ModalCurrency } from '../../containers';
import { C, SHAPE, STYLE, THEME, TEXT } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import PKG from '../../../package.json';
import styles from './Settings.style';

const { SERVICE } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const { COLOR } = THEME;
const {
  EN: {
    COPYRIGHT, HINT_FIND_BY_NAME, LOCAL_CURRENCY, NAME, SETTINGS,
  },
} = TEXT;
let timeout;

class Settings extends Component {
  constructor(props) {
    super(props);
    const { device: { currency, image, name } } = props;
    this.state = {
      image,
      camera: false,
      currency,
      currencies: false,
      name,
      timestamp: new Date().getTime(),
    };
    this._onCurrency = this._onCurrency.bind(this);
    this._onImage = this._onImage.bind(this);
    this._onModalCurrency = this._onModalCurrency.bind(this);
    this._onModalImage = this._onModalImage.bind(this);
    this._onName = this._onName.bind(this);
  }

  async _onCurrency(currency) {
    const { updateDevice } = this.props;
    this.setState({ currencies: false, currency });
    DeviceService.update({ currency }).then(updateDevice);
  }

  async _onImage(image) {
    const { updateDevice } = this.props;
    this.setState({ image: image.uri, camera: false, timestamp: new Date().getTime() });
    DeviceService.update({ image }).then(updateDevice);
  }

  _onName(name) {
    const { updateDevice } = this.props;
    this.setState({ name });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      DeviceService.update({ name }).then(updateDevice);
    }, 1000);
  }

  _onModalCurrency() {
    this.setState({ currencies: !this.state.currencies });
  }

  _onModalImage() {
    this.setState({ camera: !this.state.camera });
  }

  render() {
    const {
      _onCurrency, _onImage, _onName, _onModalCurrency, _onModalImage,
      props: { device, navigation },
      state: {
        camera, currencies, currency, image, name, timestamp,
      },
    } = this;
    const imageUrl = image && !image.startsWith('file:')
      ? `${SERVICE}public/${image}?timestamp=${timestamp}`
      : image;

    return (
      <View style={styles.screen}>
        <Header title={SETTINGS} navigation={navigation} style={styles.header} tintColor={COLOR.TEXT_DEFAULT} />
        <Motion animation="bounceInUp" delay={400} style={styles.form}>
          <View>
            <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.thumb]}>
              <View style={styles.image}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
              <Button circle icon="camera" onPress={_onModalImage} style={styles.buttonCamera} />
            </View>
            <View style={STYLE.LIST_ITEM}>
              <Text style={styles.label}>{NAME}</Text>
              <Input onChangeText={_onName} placeholder="..." style={styles.input} value={name} />
            </View>
            <View style={STYLE.LIST_ITEM} >
              <Text style={styles.label}>{LOCAL_CURRENCY}</Text>
              <Text style={styles.input} onPress={_onModalCurrency}>{currency || device.currency}</Text>
            </View>
            <Text style={styles.text}>{HINT_FIND_BY_NAME}</Text>
          </View>
        </Motion>
        <Motion animation="bounceInUp" delay={500} style={[STYLE.CENTERED, styles.footer]}>
          <View>
            <Text style={styles.text}>❤️</Text>
            <Text style={styles.text}>{COPYRIGHT}</Text>
            <Text style={[styles.text, styles.version]}>{`Version ${PKG.version}`}</Text>
          </View>
        </Motion>
        <ModalCamera visible={camera} onClose={_onModalImage} onFile={_onImage} />
        <ModalCurrency visible={currencies} onClose={_onModalCurrency} onValue={_onCurrency} />
      </View>
    );
  }
}

Settings.propTypes = {
  device: shape(DEVICE),
  navigation: shape(NAVIGATION),
  updateDevice: func,
};

Settings.defaultProps = {
  device: {},
  navigation: undefined,
  updateDevice() {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
