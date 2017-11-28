import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Button, Header, Input } from '../../components';
import { ModalCamera, ModalCurrency } from '../../containers';
import { C, SHAPE, STYLE, THEME, TEXT } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import PKG from '../../../package.json';
import styles from './Settings.style';

const { DEV, SERVICE } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const { COLOR } = THEME;
const { EN: { SETTINGS } } = TEXT;
let timeout;

const onFlush = () => {
  AsyncStorage.clear();
};

class Settings extends Component {
  constructor(props) {
    super(props);
    const { device: { image, name } } = props;
    this.state = {
      image,
      camera: false,
      currency: false,
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
    this.setState({ currency: false });
    this.props.updateDevice(await DeviceService.update({ currency }));
  }

  async _onImage(image) {
    this.setState({ image: image.uri, camera: false, timestamp: new Date().getTime() });
    this.props.updateDevice(await DeviceService.update({ image }));
  }

  _onName(name) {
    this.setState({ name });
    clearTimeout(timeout);
    timeout = setTimeout(async() => {
      this.props.updateDevice(await DeviceService.update({ name }));
    }, 1000);
  }

  _onModalCurrency() {
    this.setState({ currency: !this.state.currency });
  }

  _onModalImage() {
    this.setState({ camera: !this.state.camera });
  }

  render() {
    const {
      _onCurrency, _onImage, _onName, _onModalCurrency, _onModalImage,
      props: { device, navigation },
      state: {
        image, currency, camera, name, timestamp,
      },
    } = this;
    const imageUrl = image && !image.startsWith('file:')
      ? `${SERVICE}public/${image}?timestamp=${timestamp}`
      : image;

    return (
      <View style={styles.screen}>
        <Header title={SETTINGS} navigation={navigation} style={styles.header} tintColor={COLOR.TEXT_DEFAULT} />
        <Motion animation="bounceInUp" delay={400}>
          <View>
            <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.thumb]}>
              <View style={styles.image}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
              <Button circle icon="camera" onPress={_onModalImage} style={styles.buttonCamera} />
            </View>
            <View style={STYLE.LIST_ITEM}>
              <Text style={styles.label}>Name</Text>
              <Input onChangeText={_onName} placeholder="..." style={styles.input} value={name} />
            </View>
            <View style={STYLE.LIST_ITEM} >
              <Text style={styles.label}>Currency</Text>
              <Text style={styles.input} onPress={_onModalCurrency}>{device.currency}</Text>
            </View>
            { DEV && <Button accent caption="Flush Memory" onPress={onFlush} style={styles.button} /> }
          </View>
        </Motion>
        <ModalCamera visible={camera} onClose={_onModalImage} onFile={_onImage} />
        <ModalCurrency visible={currency} onClose={_onModalCurrency} onValue={_onCurrency} />
        <Text style={styles.version}>{`Version ${PKG.version}`}</Text>
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
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
