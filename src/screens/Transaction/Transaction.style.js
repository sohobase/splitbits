import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
  },

  fee: {
    alignSelf: 'center',
  },

  feeCaption: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_DISABLED,
  },
});
