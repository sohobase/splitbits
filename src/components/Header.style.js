import { Platform, StatusBar, StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, HEADER_SIZE, UNIT } = THEME;
const HEIGHT = (Platform.OS !== 'ios') ? (HEADER_SIZE + StatusBar.currentHeight) : HEADER_SIZE;

export default StyleSheet.create({
  header: {
    height: HEIGHT,
    padding: 0,
    alignItems: 'flex-end',
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    alignSelf: 'center',
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginBottom: UNIT,
  },

  button: {
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    paddingLeft: UNIT,
    paddingRight: UNIT,
    opacity: 0.75,
  },
});
