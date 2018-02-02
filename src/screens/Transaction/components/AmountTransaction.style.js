import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: OFFSET,
    paddingBottom: UNIT / 2,
  },

  summary: {
    flex: 1,
  },

  input: {
    fontSize: UNIT * 4.8,
    paddingBottom: 0,
    paddingTop: 0,
    fontWeight: FONT.WEIGHT.LIGHT,
    textAlign: 'center',
    color: COLOR.TEXT_HIGHLIGHT,
    backgroundColor: COLOR.TRANSPARENT,
  },

  label: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    backgroundColor: COLOR.TRANSPARENT,
  },

  small: {
    fontSize: FONT.SIZE.SMALL,
  },
});
