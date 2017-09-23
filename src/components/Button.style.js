import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
    borderRadius: THEME.OFFSET * 2,
    display: 'flex',
    padding: THEME.OFFSET,
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
