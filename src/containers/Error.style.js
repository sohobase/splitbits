import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const {
  BORDER_RADIUS, COLOR, FONT, FOOTER_OFFSET, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({

  container: {
    zIndex: 1,
    backgroundColor: COLOR.BACKGROUND_DISABLED,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },

  content: {
    backgroundColor: COLOR.RED,
    padding: OFFSET,
    paddingBottom: OFFSET + FOOTER_OFFSET,
  },

  info: {
    flex: 1,
  },

  message: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  code: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  button: {
    backgroundColor: COLOR.PLACEHOLDER_HIGHLIGHT,
    padding: UNIT,
    borderRadius: BORDER_RADIUS,
  },
});
