import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FOOTER_SIZE, OFFSET } = THEME;

export default StyleSheet.create({

  options: {
    marginBottom: OFFSET,
  },

  option: {
    justifyContent: 'center',
    padding: OFFSET,
  },
});
