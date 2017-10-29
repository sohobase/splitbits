import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  input: {
    fontSize: FONT.SIZE.LARGE,
    paddingTop: UNIT,
    paddingBottom: UNIT,
    paddingLeft: UNIT / 4,
    paddingRight: UNIT / 4,
    width: '100%',
  },

  highlight: {
    color: COLOR.WHITE,
    // fontWeight: FONT.WEIGHT.BOLD,
  },
});
