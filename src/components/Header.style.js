import { Platform, StyleSheet } from 'react-native';

import { THEME } from '../config';

const {
  COLOR, FONT, HEADER_SIZE, UNIT,
} = THEME;
const iOS = Platform.OS === 'ios';

export default StyleSheet.create({
  header: {
    height: HEADER_SIZE,
    padding: 0,
    alignItems: iOS ? 'flex-end' : 'center',
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
    marginBottom: iOS ? UNIT : 0,
  },

  button: {
    paddingTop: UNIT / 2,
    paddingBottom: UNIT / 2,
    width: UNIT * 4.8,
    opacity: 0.75,
  },
});
