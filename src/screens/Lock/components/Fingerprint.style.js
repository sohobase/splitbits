import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  fingerPrint: {
    minWidth: '100%',
    marginBottom: OFFSET,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  icon: {
    tintColor: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    marginRight: UNIT,
  },
});
