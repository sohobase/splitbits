import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  info: {

  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  value: {
    fontSize: FONT.SIZE.DEFAULT,
  },
});
