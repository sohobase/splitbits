import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
  },

  button: {
    margin: OFFSET,
  },

  buttonCaption: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  fee: {
    alignSelf: 'center',
  },

  feeCaption: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_DISABLED,
  },
});
