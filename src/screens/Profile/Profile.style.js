import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, UNIT } = THEME;

export default StyleSheet.create({
  preview: {
    flex: 1,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    alignSelf: 'center',
    marginBottom: UNIT,
  },
});
