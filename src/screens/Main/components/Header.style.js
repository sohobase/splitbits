import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    minWidth: '100%',
    paddingHorizontal: OFFSET,
  },

  amounts: {
    flex: 1,
  },

  amount: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    backgroundColor: COLOR.TRANSPARENT,
  },

  tag: {
    marginLeft: UNIT / 2,
  },

  title: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.TINY,
    fontWeight: FONT.WEIGHT.BOLD,
    backgroundColor: COLOR.TRANSPARENT,
  },
});
