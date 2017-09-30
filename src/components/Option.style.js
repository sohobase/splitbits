import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, FOOTER_SIZE, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  option: {
    minHeight: FOOTER_SIZE,
    backgroundColor: COLOR.WHITE,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
    width: FONT.SIZE.EXTRA_LARGE,
    height: FONT.SIZE.EXTRA_LARGE,
    marginBottom: UNIT / 3,
  },

  image: {
    width: UNIT * 6.4,
    height: UNIT * 6.4,
    marginBottom: UNIT / 3,
    resizeMode: 'cover',
  },

  iconAccent: {
    tintColor: COLOR.ACCENT,
  },

  texts: {
    paddingLeft: OFFSET,
  },

  caption: {
    color: COLOR.TEXT,
    fontSize: FONT.SIZE.DEFAULT,
  },

  text: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },
});
