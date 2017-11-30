import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  amount: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  trend: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },
});
