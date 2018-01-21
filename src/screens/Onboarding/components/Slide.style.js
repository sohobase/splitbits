import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

const IMAGE_SIZE = UNIT * 16;

export default StyleSheet.create({
  slide: {
    padding: OFFSET,
  },

  image: {
    marginBottom: OFFSET,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    tintColor: COLOR.WHITE,
    resizeMode: 'contain',
  },

  caption: {
    marginBottom: OFFSET,
    marginTop: OFFSET,
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  hint: {
    fontSize: FONT.SIZE.DEFAULT,
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    textAlign: 'center',
    marginBottom: OFFSET,
  },

});
