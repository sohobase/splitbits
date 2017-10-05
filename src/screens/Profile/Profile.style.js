import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { AVATAR_SIZE, COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  preview: {
    flex: 1,
  },

  qr: {
    position: 'absolute',
    bottom: OFFSET,
    right: OFFSET,
    alignSelf: 'center',
    backgroundColor: 'orange',
  },

  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    backgroundColor: COLOR.WHITE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: COLOR.WHITE,
  },

  buttonCamera: {
    position: 'absolute',
    right: -OFFSET,
    bottom: -OFFSET,
    transform: [{ scale: 0.6 }],
  },


  input: {
    marginTop: UNIT,
    textAlign: 'center',
  },
});
