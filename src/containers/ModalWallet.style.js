import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({

  content: {
    padding: OFFSET,
  },

  text: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.DEFAULT,
    textAlign: 'center',
  },

  address: {
    marginTop: OFFSET,
    color: COLOR.TEXT_SECONDARY,
  },

  buttons: {
    marginHorizontal: OFFSET,
  },

  button: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
