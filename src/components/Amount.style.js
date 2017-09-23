import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { FONT } = THEME;

export default StyleSheet.create({
  symbol: {
    fontSize: FONT.SIZE.SMALL,
    opacity: 0.9,
  },

  value: {
    fontSize: FONT.SIZE.DEFAULT,
  },
});
