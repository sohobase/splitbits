import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  buttonCaption: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
