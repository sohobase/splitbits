import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, FOOTER_SIZE, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '35%',
    height: FOOTER_SIZE,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
    width: FONT.SIZE.EXTRA_LARGE,
    height: FONT.SIZE.EXTRA_LARGE,
    marginBottom: UNIT / 3,
  },

  caption: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },
});
