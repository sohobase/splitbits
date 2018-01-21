import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
  },

  square: {
    borderRadius: THEME.OFFSET * 2,
    padding: THEME.OFFSET,
  },

  circle: {
    width: THEME.BUTTON_CIRCLE_SIZE,
    height: THEME.BUTTON_CIRCLE_SIZE,
    borderRadius: THEME.BUTTON_CIRCLE_SIZE / 2,
  },

  raised: {
    backgroundColor: COLOR.TRANSPARENT,
  },

  primary: {
    backgroundColor: COLOR.PRIMARY,
    shadowColor: COLOR.PRIMARY,
    shadowOffset: { height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
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
  },

  disabledOpacity: {
    opacity: 0.35,
  },

  caption: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    backgroundColor: COLOR.TRANSPARENT,
  },

  captionProcessing: {
    color: COLOR.TEXT_DISABLED,
  },

  icon: {
    tintColor: COLOR.WHITE,
  },
});
