import { func } from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Input } from '../../components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import { updateDeviceAction } from '../../store/actions';
import { CameraModal, CurrencyModal } from './components';
import styles from './Settings.style';

const { COLOR } = THEME;
const { SERVICE } = C;
let timeout;

class Settings extends Component {
  constructor(props) {
    super(props);
    const { device: { image, name } } = props;
    this.state = {
      image,
      modalImage: false,
      modalCurrency: false,
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
    this.setState({ modalCurrency: false });
    this.props.updateDevice(await DeviceService.update({ currency }));
  }

  async _onImage(image) {
    this.setState({ image: image.uri, modalImage: false, timestamp: new Date().getTime() });
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
    this.setState({ modalCurrency: !this.state.modalCurrency });
  }

  _onModalImage() {
    this.setState({ modalImage: !this.state.modalImage });
  }



  render() {
    const {
      _onCurrency, _onImage, _onName, _onModalCurrency, _onModalImage,
      props: { device: { currency }, navigation },
      state: { image, modalCurrency, modalImage, name, timestamp },
    } = this;
    const imageUrl = image && !image.startsWith('file:')
      ? `${SERVICE}public/${image}?timestamp=${timestamp}`
      : image;

    return (
      <View style={[STYLE.SCREEN, styles.screen]}>
        <Header title="Settings" navigation={navigation} tintColor={COLOR.TEXT_DEFAULT} />
        <View>
          <View style={[STYLE.LIST_ITEM, styles.thumb]}>
            <View style={styles.image}>
              <Image source={{ uri: imageUrl }} style={[styles.image, styles.imageBorder]} />
            </View>
            <Button circle icon="camera" onPress={_onModalImage} style={styles.buttonCamera} />
          </View>
          <View style={STYLE.LIST_ITEM}>
            <Text style={styles.label}>Name</Text>
            <Input
              autoFocus={!name || name.length === 0}
              onChangeText={_onName}
              placeholder="Choose a name..."
              style={styles.input}
              value={name}
            />
          </View>
          <View style={STYLE.LIST_ITEM} >
            <Text style={styles.label}>Currency</Text>
            <Text style={styles.input} onPress={_onModalCurrency}>{currency}</Text>
          </View>
        </View>
        <CameraModal visible={modalImage} onClose={_onModalImage} onFile={_onImage} />
        <CurrencyModal visible={modalCurrency} onClose={_onModalCurrency} onValue={_onCurrency} />
      </View>
    );
  }
}

Settings.propTypes = {
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
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
