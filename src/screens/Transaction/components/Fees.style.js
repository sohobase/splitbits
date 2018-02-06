import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, ROW_MIN_HEIGHT, UNIT
} = THEME;

export default StyleSheet.create({
  option: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
    marginTop: UNIT / 2,
    marginHorizontal: 1,
    width: ROW_MIN_HEIGHT,
    height: ROW_MIN_HEIGHT / 2,
  },

  priority: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },

  slow: {
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },

  active: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
  },

  label: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.TINY,
  },

  fee: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.TINY,
  },
});
