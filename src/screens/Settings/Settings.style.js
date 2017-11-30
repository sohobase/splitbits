import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const {
  AVATAR_SIZE, COLOR, FONT, FOOTER_OFFSET, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  thumb: {
    height: (AVATAR_SIZE * 3) + (OFFSET * 2),
  },

  image: {
    position: 'absolute',
    width: AVATAR_SIZE * 3,
    height: AVATAR_SIZE * 3,
    borderRadius: AVATAR_SIZE * 1.5,
    overflow: 'hidden',
    backgroundColor: COLOR.DIVIDER,
  },

  buttonCamera: {
    top: AVATAR_SIZE,
    right: -AVATAR_SIZE,
    transform: [{ scale: 0.6 }],
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

  button: {
    margin: OFFSET,
  },

  version: {
    position: 'absolute',
    bottom: OFFSET + FOOTER_OFFSET,
    left: OFFSET,
    right: OFFSET,
    textAlign: 'center',
    color: COLOR.TEXT_DISABLED,
  },
});
