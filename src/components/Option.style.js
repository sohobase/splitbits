import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, DISABLED, FONT, FOOTER_SIZE, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  option: {
    minHeight: FOOTER_SIZE,
    backgroundColor: COLOR.WHITE,
  },

  disabled: {
    opacity: DISABLED,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
    width: FONT.SIZE.EXTRA_LARGE,
    height: FONT.SIZE.EXTRA_LARGE,
    marginBottom: UNIT / 3,
  },

  activity: {
    position: 'absolute',
    alignSelf: 'center',
    left: '57.5%',
    bottom: '65%',
    width: UNIT,
    height: UNIT,
    backgroundColor: COLOR.ACCENT,
    borderRadius: UNIT,
  },

  image: {
    width: UNIT * 6.4,
    height: UNIT * 6.4,
    marginBottom: UNIT / 3,
    resizeMode: 'cover',
  },

  iconAccent: {
    tintColor: COLOR.ACCENT,
  },

  texts: {
    paddingLeft: OFFSET,
  },

  caption: {
    color: COLOR.TEXT,
    fontSize: FONT.SIZE.DEFAULT,
  },

  text: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },

  row: {
    paddingLeft: OFFSET,
    paddingRight: OFFSET,
    paddingBottom: UNIT,
    paddingTop: UNIT,
  },
});
