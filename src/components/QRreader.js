import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { C, TEXT, THEME } from '../config';
import Button from './Button';
import styles from './QRreader.style';

const { IS_DEVICE } = C;
const { EN: { CAPTION: { CAMERA_PERMISSION, QR_CODE } } } = TEXT;
const { ANIMATION: { DURATION } } = THEME;

class QRreader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
    };
    this._onRead = this._onRead.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }
  }

  _onRead({ data, type }) {
    const { onRead } = this.props;
    Vibration.vibrate(500);
    onRead(data, type);
  }

  render() {
    const { _onRead, props: { active, onClose }, state: { hasCameraPermission } } = this;

    return (
      active
        ?
          <View style={styles.QRreader}>
            { IS_DEVICE && hasCameraPermission &&
              <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeRead={_onRead}
                style={StyleSheet.absoluteFill}
              /> }
            <View style={styles.border}>
              <Text style={styles.hint}>{hasCameraPermission ? QR_CODE : CAMERA_PERMISSION}</Text>
            </View>
            <View style={styles.content} >
              <View style={styles.border} />
              <View style={styles.area} />
              <View style={styles.border} />
            </View>
            <View style={styles.border}>
              <Button
                accent
                motion={{ animation: 'bounceInUp', delay: 300, duration: DURATION }}
                circle
                icon="close"
                onPress={onClose}
                style={styles.button}
              />
            </View>
          </View>
        :
          <View />
    );
  }
}

QRreader.propTypes = {
  active: bool,
  onClose: func,
  onRead: func,
};

QRreader.defaultProps = {
  active: false,
  onClose() {},
  onRead() {},
};

export default QRreader;
