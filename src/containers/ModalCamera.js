import { bool, func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { FileSystem, ImagePicker } from 'expo';
import { Modal, Option } from '../components';
import { STYLE } from '../config';

const ModalCamera = ({ onClose, onFile, visible }) => {
  const launchCamera = async() => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      const file = await FileSystem.getInfoAsync(result.uri);
      onFile(file);
    }
  };

  const launchImageLibrary = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      const file = await FileSystem.getInfoAsync(result.uri);
      onFile(file);
    }
  };

  return (
    <Modal title="Update your avatar" visible={visible} onClose={onClose}>
      <View style={[STYLE.COL]}>
        <Option
          caption="Camera"
          hint="lorem ipsum..."
          icon="camera"
          onPress={launchCamera}
        />
        <Option
          caption="Gallery"
          hint="lorem ipsum..."
          icon="gallery"
          onPress={launchImageLibrary}
        />
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
