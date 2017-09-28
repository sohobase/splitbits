import { Platform, StatusBar, StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, HEADER_SIZE, OFFSET, UNIT } = THEME;
const HEIGHT = (Platform.OS !== 'ios') ? (HEADER_SIZE + StatusBar.currentHeight) : HEADER_SIZE;

export default StyleSheet.create({
  header: {
    height: HEIGHT,
    padding: 0,
    alignItems: 'flex-end',
  },

  main: {
    flex: 1,
    alignItems: 'center',
  },

  button: {
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    paddingLeft: OFFSET,
    paddingRight: OFFSET,
    opacity: 0.75,
  },

  title: {
    alignSelf: 'center',
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginBottom: UNIT,
  },
});
