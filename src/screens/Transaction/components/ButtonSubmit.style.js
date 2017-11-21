import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  button: {
    margin: OFFSET,
  },

  buttonCaption: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
