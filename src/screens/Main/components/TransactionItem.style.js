import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, UNIT, OFFSET } = THEME;
const ICON_DISABLED = '#666666';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  icon: {
    position: 'absolute',
    bottom: -UNIT / 5,
    right: -UNIT / 5,
    width: OFFSET,
    height: OFFSET,
    backgroundColor: COLOR.PRIMARY,
    tintColor: COLOR.WHITE,
    borderRadius: OFFSET / 2,
  },

  iconAlert: {
    backgroundColor: COLOR.ACCENT,
  },

  info: {
    flex: 1,
    marginRight: UNIT,
    marginLeft: UNIT,
  },

  name: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },

  amounts: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: FONT.SIZE.DEFAULT,
  },
});
