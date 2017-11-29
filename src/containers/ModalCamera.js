import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { FileSystem, ImagePicker } from 'expo';
import { Modal, Option } from '../components';
import { STYLE, TEXT } from '../config';

const { EN: { CHANGE_YOUR_AVATAR, CHOOSE_EXISTING_PHOTO, TAKE_PHOTO } } = TEXT;

const ModalCamera = ({ onClose, onFile, visible }) => {
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
    <Modal title={CHANGE_YOUR_AVATAR} visible={visible} onClose={onClose}>
      <View style={[STYLE.COL]}>
        <Option caption={TAKE_PHOTO} icon="camera" onPress={launchCamera} />
        <Option caption={CHOOSE_EXISTING_PHOTO} icon="gallery" onPress={launchImageLibrary} />
      </View>
    </Modal>
  );
};

ModalCamera.propTypes = {
  onClose: func,
  onFile: func,
  visible: bool,
};

ModalCamera.defaultProps = {
  onClose() {},
  onFile() {},
  visible: false,
};

export default ModalCamera;
