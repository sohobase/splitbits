import Color from 'color';
import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  selected: {
    backgroundColor: Color(COLOR.PRIMARY).lighten(0.9),
  },

  content: {
    marginLeft: OFFSET,
    flex: 1,
  },

  name: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    lineHeight: FONT.SIZE.LARGE,
  },

  private: {
    color: COLOR.TEXT_SECONDARY,
  },

  hint: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },

  button: {
    marginLeft: OFFSET,
    padding: UNIT,
  },

  buttonCaption: {
    fontSize: FONT.SIZE.SMALL,
  },
});
