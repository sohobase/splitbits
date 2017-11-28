import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },

  summary: {
    minHeight: THEME.QR_SIZE,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
    borderTopWidth: 1,
    borderTopColor: COLOR.DIVIDER,
    padding: OFFSET,
  },

  hint: {
    color: COLOR.TEXT_DISABLED,
    fontSize: FONT.SIZE.SMALL,
    alignSelf: 'center',
    marginTop: OFFSET,
  },
});
