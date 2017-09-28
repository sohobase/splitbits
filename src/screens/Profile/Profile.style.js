import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  preview: {
    flex: 1,
  },

  qr: {

  },

  image: {

  },

  name: {
    marginTop: OFFSET,
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  content: {
    padding: OFFSET,
  },
});
