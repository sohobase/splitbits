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

  texts: {
    paddingLeft: OFFSET,
  },

  caption: {
    color: COLOR.TEXT,
    fontSize: FONT.SIZE.LARGE,
  },

  text: {
    alignSelf: 'center',
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },
});
