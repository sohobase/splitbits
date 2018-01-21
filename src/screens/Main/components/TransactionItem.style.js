import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  COLOR, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  icon: {
    position: 'absolute',
    bottom: -UNIT / 5,
    right: -UNIT / 5,
    backgroundColor: COLOR.PRIMARY,
  },

  iconLayout: {
    width: OFFSET,
    height: OFFSET,
    borderRadius: OFFSET / 2,
  },

  iconColor: {
    tintColor: COLOR.WHITE,
  },

  iconAlert: {
    backgroundColor: COLOR.ACCENT,
  },

  info: {
    flex: 1,
    marginRight: UNIT,
    marginLeft: UNIT,
  },

  title: {
    // fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },

  amounts: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: FONT.SIZE.DEFAULT,
  },
});
