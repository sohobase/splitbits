import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  footer: {
    backgroundColor: COLOR.WHITE,
    height: FOOTER_SIZE,
    shadowColor: COLOR.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  option: {
    minWidth: '50%',
  },
});
