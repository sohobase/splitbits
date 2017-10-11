import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR } = THEME;

export default StyleSheet.create({
  input: {
    flex: 1,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },
});
