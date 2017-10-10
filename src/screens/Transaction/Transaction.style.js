import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  screen: {},

  preview: {
    flex: 1,
    paddingLeft: OFFSET,
    paddingRight: OFFSET,
    marginBottom: OFFSET,
  },

  amount: {
    fontSize: UNIT * 4.8,
    fontWeight: FONT.WEIGHT.LIGHT,
    textAlign: 'center',
  },

  label: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  fee: {
    position: 'absolute',
    bottom: 0,
  },

  small: {
    fontSize: FONT.SIZE.SMALL,
  },

  button: {
    margin: OFFSET,
  },
});
