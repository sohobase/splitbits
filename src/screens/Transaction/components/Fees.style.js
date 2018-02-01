import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, OFFSET, ROW_MIN_HEIGHT,
} = THEME;

export default StyleSheet.create({
  container: {
    marginVertical: OFFSET / 2,
  },

  option: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
    marginHorizontal: 1,
    width: ROW_MIN_HEIGHT,
    height: ROW_MIN_HEIGHT / 2,
  },

  fast: {
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

  title: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.TINY,
  },

  fee: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.SMALL,
  },
});
