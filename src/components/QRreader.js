import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Button from './Button';
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
      <View style={styles.QRreader}>
        <View style={styles.border}>
          <Text style={styles.hint}>Place the code inside the frame</Text>
        </View>
        <View style={styles.content} >
          <View style={styles.border} />
          <View style={styles.area} />
          <View style={styles.border} />
        </View>
        <View style={styles.border}>
          <Button circle icon="close" onPress={onClose} accent />
        </View>
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
