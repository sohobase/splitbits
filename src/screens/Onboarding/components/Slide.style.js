import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  slide: {
    padding: OFFSET,
  },

  image: {
    marginTop: OFFSET * 3,
    marginBottom: OFFSET * 3,
    width: UNIT * 19.2,
    height: UNIT * 19.2,
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
  },

  caption: {
    marginBottom: OFFSET,
    marginTop: OFFSET,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  text: {
    fontSize: FONT.SIZE.DEFAULT,
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    textAlign: 'center',
  },

});
