import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

const SIZE = {
  WIDTH: UNIT * 22.4,
  HEIGHT: UNIT * 14.4,
};

export default StyleSheet.create({
  container: {
    zIndex: 1,
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT,
    backgroundColor: COLOR.WHITE,
    marginTop: OFFSET,
    marginBottom: OFFSET,
    alignSelf: 'center',
    borderRadius: THEME.BORDER_RADIUS,
    shadowColor: COLOR.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  empty: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
    shadowOffset: { height: 0 },
  },

  content: {
    padding: OFFSET,
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
    padding: UNIT / 2,
    backgroundColor: COLOR.ACCENT,
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.SMALL,
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
    right: -UNIT,
    top: 0,
  },

  menuIcon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },

  options: {
    marginTop: OFFSET * 2,
    alignSelf: 'center',
  },

  option: {
    paddingLeft: UNIT,
    paddingRight: UNIT,
    paddingTop: OFFSET * 2,
  },

  button: {
    backgroundColor: COLOR.WHITE,
    marginBottom: UNIT / 2,
  },

  caption: {
    tintColor: COLOR.PRIMARY,
  },

  highlight: {
    color: COLOR.WHITE,
  },
});
