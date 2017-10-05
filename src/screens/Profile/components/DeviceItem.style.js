import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { AVATAR_SIZE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: THEME.ACCENT,
  },

  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: 'cover',
  },

});
