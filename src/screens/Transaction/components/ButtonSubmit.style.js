import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  buttonCaption: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.SMALL,
  },
});
