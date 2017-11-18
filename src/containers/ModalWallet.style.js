import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({

  info: {
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
  },

  address: {
    marginTop: OFFSET,
    color: COLOR.TEXT_SECONDARY,
  },
});
