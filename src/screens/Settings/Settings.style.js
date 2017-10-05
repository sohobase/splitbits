import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, HEADER_SIZE, UNIT } = THEME;

export default StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },

  header: {
    // backgroundColor: COLOR.ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },
});
