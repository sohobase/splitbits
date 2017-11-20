import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  footer: {
    backgroundColor: COLOR.WHITE,
    height: FOOTER_SIZE,
    elevation: 0,
  },

  elevation: {
    elevation: 8,
  },

  option: {
    minWidth: '50%',
  },
});
