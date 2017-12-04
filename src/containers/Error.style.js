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

  error: {
    backgroundColor: COLOR.RED,
    padding: OFFSET,
    paddingBottom: FOOTER_OFFSET,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  body: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  button: {
    backgroundColor: COLOR.PLACEHOLDER_HIGHLIGHT,
    padding: UNIT,
    borderRadius: BORDER_RADIUS,
  },
});
