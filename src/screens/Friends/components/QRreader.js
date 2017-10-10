import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import styles from './QRreader.style';

class QRreader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: false,
    };
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _onBarCodeRead = ({ data }) => {
    const { onClose, onRead } = this.props;
    onClose();
    onRead(data);
  }

  render() {
    const { active, onClose } = this.props;
    const { hasCameraPermission } = this.state;

    if (!active || !hasCameraPermission) return <View />;

    return (
      <View style={StyleSheet.absoluteFill}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeRead={this._onBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.title}>Scan QR Code</Text>
        <Text onPress={onClose} style={styles.cancel}>Cancel</Text>
        <View style={styles.topBotton} />
        <View style={{ flexDirection: 'row' }} >
          <View style={styles.rightLeft} />
          <View style={styles.container} />
          <View style={styles.rightLeft} />
        </View>
        <View style={styles.topBotton} />
      </View>
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
