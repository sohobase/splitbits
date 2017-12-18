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

  form: {
    zIndex: 1,
    minHeight: '65%',
    height: '65%',
    backgroundColor: COLOR.WHITE,
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

  footer: {
    position: 'absolute',
    zIndex: 0,
    bottom: OFFSET + FOOTER_OFFSET,
    maxWidth: '90%',
    alignSelf: 'center',
  },

  sohobase: {
    height: FONT.SIZE.DEFAULT,
    resizeMode: 'contain',
    tintColor: COLOR.BLACK,
    marginBottom: UNIT / 2,
  },

  text: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    textAlign: 'center',
    marginTop: UNIT / 2,
    marginLeft: UNIT,
    marginRight: UNIT,
  },

  version: {
    color: COLOR.TEXT_DISABLED,
  },
});
