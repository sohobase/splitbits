import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Button, Header } from '../../components';
import { ModalCamera, ModalValues } from '../../containers';
import { ASSETS, C, SHAPE, STYLE, THEME } from '../../config';
import { DeviceService, WalletService } from '../../services';
import { updateDeviceAction, updateWalletAction } from '../../store/actions';
import PKG from '../../../package.json';
import { Fieldset } from './components';
import styles from './Settings.style';

const { FIAT, LANGUAGES, SERVICE } = C;
const { COLOR } = THEME;
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
    const { 
      params = {}, 
      props: { updateDevice, updateWallet, wallets }, 
      state: { context }, 
    } = this;
    params[context] = value;
    this.setState({ modal: false, ...params });
    await DeviceService.update(params).then(updateDevice);
    WalletService
      .state({ ids: wallets.map(({ id }) => id) })
      .then((values = []) => values.forEach(wallet => updateWallet(wallet)));
  }

  render() {
    const {
      _onModalValue, _onImage, _onName, _onModal, _onModalImage,
    } = this;
    const { device, i18n, navigation } = this.props;
    const {
      camera, context, image, modal, name, timestamp,
      currency = device.currency,
      language = device.language,
      trend = device.trend || 'daily',
    } = this.state;
    const imageUrl = image && !image.startsWith('file:')
      ? `${SERVICE}public/${image}?timestamp=${timestamp}`
      : image;

    let modalTitle = i18n.CHOOSE_CURRENCY;
    let modalValues = FIAT;
    if (context === 'language') {
      modalTitle = i18n.CHOOSE_LANGUAGE;
      modalValues = LANGUAGES;
    } else if (context === 'trend') {
      modalTitle = i18n.CHOOSE_TREND;
      modalValues = i18n.TRENDS;
    }

    return (
      <View style={styles.screen}>
        <Header title={i18n.SETTINGS} navigation={navigation} style={styles.header} tintColor={COLOR.TEXT_DEFAULT} />
        <Motion animation="bounceInUp" delay={400} style={styles.form}>
          <View>
            <View style={[STYLE.LIST_ITEM, STYLE.CENTERED, styles.thumb]}>
              <View style={styles.image}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
              <Button circle icon="camera" onPress={_onModalImage} style={styles.buttonCamera} />
            </View>
            <Fieldset input label={i18n.NAME} value={name} onChange={_onName} />
            <Fieldset label={i18n.LOCAL_CURRENCY} value={currency} onChange={() => _onModal('currency')} />
            <Fieldset label={i18n.TREND} value={i18n.TRENDS[trend]} onChange={() => _onModal('trend')} />
            <Fieldset label={i18n.LANGUAGE} value={LANGUAGES[language]} onChange={() => _onModal('language')} />
            <Text style={styles.text}>{i18n.HINT_FIND_BY_NAME}</Text>
          </View>
        </Motion>
        <Motion animation="bounceInUp" delay={500} style={[STYLE.CENTERED, styles.footer]}>
          <Image source={ASSETS.sohobase} style={styles.sohobase} />
          <View>
            <Text style={styles.text}>❤️</Text>
            <Text style={styles.text}>{i18n.COPYRIGHT}</Text>
            <Text style={[styles.text, styles.version]}>{`Version ${PKG.version}`}</Text>
          </View>
        </Motion>
        <ModalCamera visible={camera} onClose={_onModalImage} onFile={_onImage} />
        <ModalValues
          title={modalTitle}
          values={modalValues}
          visible={modal}
          onClose={_onModal}
          onValue={_onModalValue}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape(SHAPE.I18N).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  updateDevice: func,
  updateWallet: func,
  wallets: arrayOf(shape(SHAPE.WALLET)),
};

Settings.defaultProps = {
  updateDevice() {},
  updateWallet() {},
};

const mapStateToProps = ({ device, i18n, wallets }) => ({
  device,
  i18n,
  wallets,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
  updateWallet: device => device && dispatch(updateWalletAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
