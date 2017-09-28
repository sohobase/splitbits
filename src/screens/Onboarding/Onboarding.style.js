import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FOOTER_SIZE, OFFSET, UNIT } = THEME;

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
    width: UNIT * 0.65,
    height: UNIT * 0.65,
    backgroundColor: COLOR.BACKGROUND_DARK,
  },

  dotActive: {
    backgroundColor: COLOR.WHITE,
  },
});
