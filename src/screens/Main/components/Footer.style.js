import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FOOTER_OFFSET, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  footer: {
    backgroundColor: COLOR.WHITE,
    height: FOOTER_SIZE + FOOTER_OFFSET,
    elevation: 0,
    alignItems: 'flex-start',
  },

  elevation: {
    elevation: 8,
  },

  option: {
    minWidth: '50%',
    height: FOOTER_SIZE,
  },
});
