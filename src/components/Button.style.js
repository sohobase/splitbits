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

  accent: {
    backgroundColor: COLOR.ACCENT,
    shadowColor: COLOR.ACCENT,
    shadowOffset: { height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  disabled: {
    backgroundColor: COLOR.DIVIDER,
    opacity: 0.35,
  },

  processing: {
    backgroundColor: COLOR.DIVIDER,
  },

  caption: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  icon: {
    tintColor: COLOR.WHITE,
  },
});
