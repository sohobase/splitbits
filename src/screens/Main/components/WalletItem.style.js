import { Platform, StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, OFFSET, UNIT,
} = THEME;

const SIZE = {
  WIDTH: UNIT * 22.4,
  HEIGHT: UNIT * 14.4,
};

export default StyleSheet.create({
  container: {
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT,
    backgroundColor: COLOR.WHITE,
    marginTop: OFFSET,
    marginBottom: OFFSET,
    alignSelf: 'center',
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
    paddingRight: OFFSET,
    height: SIZE.HEIGHT,
  },

  info: {
    flex: 1,
    width: '90%',
  },

  name: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  pro: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  tag: {
    padding: UNIT / 2,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR.ACCENT,
  },

  tagLabel: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.TINY,
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
    tintColor: COLOR.TEXT_SECONDARY,
    marginRight: UNIT / 2,
  },

  menu: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? -UNIT : 0,
    top: Platform.OS === 'ios' ? 0 : UNIT,
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
