import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { AVATAR_SIZE, COLOR, FONT, HEADER_SIZE, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },

  header: {
    // backgroundColor: COLOR.ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  image: {
    width: AVATAR_SIZE * 3,
    height: AVATAR_SIZE * 3,
    borderRadius: AVATAR_SIZE * 1.5,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  imageBorder: {
    borderWidth: 4,
    borderColor: COLOR.WHITE,
  },

  buttonCamera: {
    position: 'absolute',
    left: AVATAR_SIZE / 2,
    // right: -OFFSET,
    bottom: -OFFSET,
    transform: [{ scale: 0.6 }],
    // alignSelf: 'center',
  },

  buttonSave: {
    margin: OFFSET,
  },

  input: {
    fontSize: FONT.SIZE.LARGE,
    paddingTop: UNIT,
    paddingBottom: 0,
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },
});
