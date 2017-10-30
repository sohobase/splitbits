import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  preview: {
    flex: 1,
    paddingLeft: OFFSET,
    paddingRight: OFFSET,
    marginBottom: UNIT / 2,
  },

  input: {
    fontSize: UNIT * 4.8,
    paddingBottom: 0,
    paddingTop: 0,
    fontWeight: FONT.WEIGHT.LIGHT,
    textAlign: 'center',
  },

  label: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  small: {
    fontSize: FONT.SIZE.SMALL,
  },

  balance: {
    position: 'absolute',
    bottom: 0,
  },
});
