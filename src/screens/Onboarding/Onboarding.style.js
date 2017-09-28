import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, FOOTER_SIZE, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  loading: {
    backgroundColor: COLOR.PRIMARY,
  },

  navigation: {
    display: 'flex',
    position: 'absolute',
    height: FOOTER_SIZE,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR.BACKGROUND_DISABLED,
  },

  button: {
    position: 'absolute',
    bottom: UNIT / 3,
  },

  buttonCaption: {
    padding: OFFSET,
  },

  left: {
    alignSelf: 'flex-start',
  },

  right: {
    alignSelf: 'flex-end',
  },

  dot: {
    zIndex: 1,
    width: UNIT / 2,
    height: UNIT / 2,
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
  },

  dotActive: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },
});
