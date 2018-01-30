import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, ROW_MIN_HEIGHT,
} = THEME;

export default StyleSheet.create({
  item: {
    borderBottomWidth: 0,
    minWidth: '100%',
    minHeight: 'auto',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  value: {
    fontSize: FONT.SIZE.DEFAULT,
    marginRight: ROW_MIN_HEIGHT,
  },

  placeholder: {
    fontSize: FONT.SIZE.LARGE,
    color: COLOR.TEXT_DISABLED,
  },

  icon: {
    position: 'absolute',
    right: OFFSET,
    tintColor: COLOR.TEXT_SECONDARY,
    zIndex: 1,
  },
});
