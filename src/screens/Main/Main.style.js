import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const {
  COLOR, FONT, HEADER_SIZE, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  env: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: HEADER_SIZE - (2.5 * OFFSET),
    backgroundColor: COLOR.ACCENT,
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.TINY,
    fontWeight: FONT.WEIGHT.BOLD,
    paddingTop: UNIT / 4,
    paddingBottom: UNIT / 4,
    paddingLeft: UNIT / 2,
    paddingRight: UNIT / 2,
  },

  left: {
    left: OFFSET,
  },

  right: {
    right: OFFSET,
  },
});
