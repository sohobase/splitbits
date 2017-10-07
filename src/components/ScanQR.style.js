import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  cancel: {
    position: 'absolute',
    bottom: 30,
    zIndex: 2,
    color: COLOR.WHITE,
    alignSelf: 'center',
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.LIGHT,
  },
  container: {
    flex: 1,
  },
  rightLeft: {
    width: 30,
    height: 350,
    backgroundColor: COLOR.BACKGROUND_DARK,
  },
  title: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 2,
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.EXTRA_LARGE,
    fontWeight: FONT.WEIGHT.LIGHT,
  },
  topBotton: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_DARK,
  },
});
