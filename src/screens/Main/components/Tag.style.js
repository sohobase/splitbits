import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    padding: UNIT / 2,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR.PLACEHOLDER_HIGHLIGHT,
  },

  title: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.TINY,
  },
});
