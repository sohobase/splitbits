import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({

  content: {
    padding: OFFSET,
  },

  address: {
    marginTop: OFFSET,
    color: COLOR.TEXT_SECONDARY,
  },

  subtitle: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    marginBottom: UNIT,
  },

  text: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    marginVertical: UNIT / 4,
  },

  buttons: {
    marginHorizontal: OFFSET,
  },

  button: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
