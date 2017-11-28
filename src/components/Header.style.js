import { Platform, StatusBar, StyleSheet } from 'react-native';
import { THEME } from '../config';
import { isIphoneX } from '../modules';

const {
  COLOR, FONT, HEADER_SIZE, IPHONEX_OFFSET, UNIT,
} = THEME;
let HEIGHT = isIphoneX() ? (HEADER_SIZE + IPHONEX_OFFSET) : HEADER_SIZE;
if (Platform.OS !== 'ios') HEIGHT = (HEADER_SIZE + StatusBar.currentHeight);

export default StyleSheet.create({
  header: {
    height: HEIGHT,
    padding: 0,
    alignItems: 'flex-end',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  title: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginBottom: UNIT,
  },

  button: {
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    width: UNIT * 4.8,
    opacity: 0.75,
  },
});
