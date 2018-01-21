import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, OFFSET, UNIT, WALLET_HEIGHT, WALLET_WIDTH,
} = THEME;

export default StyleSheet.create({
  container: {
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    backgroundColor: COLOR.WHITE,
    borderRadius: BORDER_RADIUS,
  },

  empty: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
    elevation: 0,
  },

  content: {
    paddingTop: UNIT,
    paddingBottom: UNIT,
    paddingLeft: OFFSET,
    paddingRight: OFFSET / 2,
    height: WALLET_HEIGHT,
  },

  info: {
    flex: 1,
    alignItems: 'flex-start',
  },

  name: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  tags: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  tag: {
    marginLeft: UNIT / 2,
    padding: UNIT / 2,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR.TEXT_SECONDARY,
  },

  tagLabel: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.TINY,
  },

  pro: {
    backgroundColor: COLOR.ACCENT,
  },

  amount: {
    color: COLOR.TEXT_DEFAULT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  fiat: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  trend: {
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
    tintColor: COLOR.TEXT_DISABLED,
    marginRight: UNIT / 2,
  },

  menu: {
    alignSelf: 'flex-end',
  },

  menuIcon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },

  options: {
    paddingTop: UNIT,
    alignSelf: 'center',
  },

  option: {
    paddingTop: UNIT,
    paddingLeft: UNIT / 4,
    paddingRight: UNIT / 4,
  },

  button: {
    backgroundColor: COLOR.WHITE,
    marginBottom: UNIT / 2,
    transform: [{ scale: 0.75 }],
  },

  caption: {
    tintColor: COLOR.PRIMARY,
  },

  highlight: {
    color: COLOR.WHITE,
  },
});
