import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  activity: {
    backgroundColor: COLOR.BACKGROUND,
  },

  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: FOOTER_SIZE * 0.25,
  },
});
