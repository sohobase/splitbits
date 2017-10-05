import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { AVATAR_SIZE, COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  preview: {
    flex: 1,
  },

  qr: {
    position: 'absolute',
    bottom: UNIT,
    right: UNIT,
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

  content: {
    padding: OFFSET,
  },

  input: {
    marginTop: UNIT,
    textAlign: 'center',
  },
});
