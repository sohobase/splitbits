import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
  },

  square: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: THEME.OFFSET * 2,
    padding: THEME.OFFSET,
  },

  circle: {
    backgroundColor: COLOR.PRIMARY,
    width: THEME.BUTTON_CIRCLE_SIZE,
    height: THEME.BUTTON_CIRCLE_SIZE,
    borderRadius: THEME.BUTTON_CIRCLE_SIZE / 2,
  },

  disabled: {
    backgroundColor: THEME.FONT_PRIMARY_COLOR,
    opacity: 0.35,
  },

  accent: {
    backgroundColor: COLOR.ACCENT,
  },

  caption: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
