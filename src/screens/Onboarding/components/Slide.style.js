import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

const IMAGE_SIZE = UNIT * 19.2;

export default StyleSheet.create({
  slide: {
    padding: OFFSET,
  },

  image: {
    marginBottom: OFFSET * 2,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
    borderRadius: IMAGE_SIZE / 2,
  },

  caption: {
    marginBottom: OFFSET,
    marginTop: OFFSET,
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  text: {
    fontSize: FONT.SIZE.DEFAULT,
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    textAlign: 'center',
    marginBottom: OFFSET,
  },

});
