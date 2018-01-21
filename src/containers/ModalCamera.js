import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { FileSystem, ImagePicker } from 'expo';

import { Modal, Option } from '../components';
import { SHAPE, STYLE } from '../config';

const ModalCamera = ({
  i18n, onClose, onFile, visible,
}) => {
  const launch = async(isCamera) => {
    const method = isCamera ? 'launchCameraAsync' : 'launchImageLibraryAsync';
    const { uri, cancelled } = await ImagePicker[method]({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!cancelled) {
      // @TODO: Workaround Expo bug
      // https://github.com/expo/expo/issues/986
      const badProtocol = 'file:///file%3A/';
      const fixedUri = (uri.indexOf(badProtocol) === 0)
        ? `file:///${decodeURIComponent(uri.substring(badProtocol.length))}`
        : uri;
      const file = await FileSystem.getInfoAsync(fixedUri);
      onFile(file);
    }
  };

  const launchCamera = () => launch(true);
  const launchImageLibrary = () => launch(false);

  return (
    <Modal title={i18n.CHANGE_YOUR_AVATAR} visible={visible} onClose={onClose}>
      <View style={[STYLE.COL]}>
        <Option caption={i18n.TAKE_PHOTO} icon="camera" onPress={launchCamera} />
        <Option caption={i18n.CHOOSE_EXISTING_PHOTO} icon="gallery" onPress={launchImageLibrary} />
      </View>
    </Modal>
  );
};

ModalCamera.propTypes = {
  i18n: shape(SHAPE.I18N).isRequired,
  onClose: func,
  onFile: func,
  visible: bool,
};

ModalCamera.defaultProps = {
  onClose() {},
  onFile() {},
  visible: false,
};

const mapStateToProps = ({ i18n }) => ({
  i18n,
});

export default connect(mapStateToProps)(ModalCamera);
