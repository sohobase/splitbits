import { Platform, StatusBar, StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, HEADER_SIZE } = THEME;

export default StyleSheet.create({
  container: {
    height: (Platform.OS !== 'ios') ? (HEADER_SIZE + StatusBar.currentHeight) : HEADER_SIZE,
    justifyContent: 'flex-end',
  },

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
