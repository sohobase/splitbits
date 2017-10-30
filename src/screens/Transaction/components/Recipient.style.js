import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({

  hint: {
    fontSize: FONT.SIZE.LARGE,
    color: COLOR.TEXT_DISABLED,
    opacity: 0.7,
  },

  input: {
    flex: 1,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },
});
