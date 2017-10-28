import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  QRreader: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  hint: {
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.SMALL,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  content: {
    flexDirection: 'row',
  },

  border: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_DARK,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  area: {
    height: 320,
    maxHeight: 320,
    width: 320,
    maxWidth: 320,
  },
});
