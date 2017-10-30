import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
  },

  button: {
    margin: OFFSET,
  },
});
