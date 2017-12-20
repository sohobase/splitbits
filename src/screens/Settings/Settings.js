import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Button, Header, Input } from '../../components';
import { ModalCamera, ModalValues } from '../../containers';
import { ASSETS, C, SHAPE, STYLE, THEME, TEXT } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import PKG from '../../../package.json';
import styles from './Settings.style';

const { FIAT, LANGUAGES, SERVICE } = C;
const { DEVICE, NAVIGATION } = SHAPE;
const { COLOR } = THEME;
const {
  EN: {
    CHOOSE_CURRENCY, CHOOSE_LANGUAGE, COPYRIGHT, HINT_FIND_BY_NAME, LANGUAGE, LOCAL_CURRENCY, NAME, SETTINGS,
  },
} = TEXT;
let timeout;

class Settings extends Component {
  constructor(props) {
    super(props);
    const {
      currency, image, language = LANGUAGES[0], name,
    } = props.device;
    this.state = {
      image,
      camera: false,
      context: undefined,
      currency,
      language,
      modal: false,
      name,
      timestamp: new Date().getTime(),
    };
    this._onImage = this._onImage.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onModalImage = this._onModalImage.bind(this);
    this._onModalValue = this._onModalValue.bind(this);
    this._onName = this._onName.bind(this);
  }

  async _onImage(image) {
    const { updateDevice } = this.props;
    this.setState({ image: image.uri, camera: false, timestamp: new Date().getTime() });
    DeviceService.update({ image }).then(updateDevice);
  }

  async _onLanguage(language) {
    const { updateDevice } = this.props;
    this.setState({ language });
    DeviceService.update({ language }).then(updateDevice);
  }

  _onName(name) {
    const { updateDevice } = this.props;
    this.setState({ name });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      DeviceService.update({ name }).then(updateDevice);
    }, 1000);
  }

  _onModal(context) {
    this.setState({
      modal: !this.state.modal,
      context: (typeof context === 'string') ? context : undefined,
    });
  }

  _onModalImage() {
    this.setState({ camera: !this.state.camera });
  }

  async _onModalValue(value) {
    const { params = {}, props: { updateDevice }, state: { context } } = this;
    params[context] = value;
    this.setState({ modal: false, ...params });
    DeviceService.update(params).then(updateDevice);
  }

  render() {
    const {
      _onModalValue, _onImage, _onName, _onModal, _onModalImage,
      props: { device, navigation },
      state: {
        camera, context, currency, image, language, modal, name, timestamp,
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
              <Text style={STYLE.LABEL}>{NAME}</Text>
              <Input onChangeText={_onName} placeholder="..." style={styles.input} value={name} />
            </View>
            <View style={STYLE.LIST_ITEM} >
              <Text style={STYLE.LABEL}>{LOCAL_CURRENCY}</Text>
              <Text style={styles.input} onPress={() => _onModal('currency')}>{currency || device.currency}</Text>
            </View>
            <View style={STYLE.LIST_ITEM}>
              <Text style={STYLE.LABEL}>{LANGUAGE}</Text>
              <Text style={styles.input} onPress={() => _onModal('language')}>{language || device.language}</Text>
            </View>
            <Text style={styles.text}>{HINT_FIND_BY_NAME}</Text>
          </View>
        </Motion>
        <Motion animation="bounceInUp" delay={500} style={[STYLE.CENTERED, styles.footer]}>
          <Image source={ASSETS.sohobase} style={styles.sohobase} />
          <View>
            <Text style={styles.text}>❤️</Text>
            <Text style={styles.text}>{COPYRIGHT}</Text>
            <Text style={[styles.text, styles.version]}>{`Version ${PKG.version}`}</Text>
          </View>
        </Motion>
        <ModalCamera visible={camera} onClose={_onModalImage} onFile={_onImage} />
        <ModalValues
          title={context === 'language' ? CHOOSE_LANGUAGE : CHOOSE_CURRENCY}
          values={context === 'language' ? LANGUAGES : Object.values(FIAT)}
          visible={modal}
          onClose={_onModal}
          onValue={_onModalValue}
        />
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
