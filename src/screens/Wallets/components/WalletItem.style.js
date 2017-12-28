import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  container: {
  },

  name: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    lineHeight: FONT.SIZE.LARGE,
  },

  balance: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },
});
