import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  container: {
    marginTop: OFFSET * 2,
    marginBottom: OFFSET,
  },

  code: {
    width: OFFSET,
    height: OFFSET,
    borderRadius: OFFSET / 2,
    margin: UNIT,
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
  },

  active: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },
});
