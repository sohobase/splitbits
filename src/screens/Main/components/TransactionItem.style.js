import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, UNIT, OFFSET } = THEME;
const IMAGE_SIZE = THEME.BUTTON_CIRCLE_SIZE * 0.65;
const ICON_DISABLED = '#666666';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
    padding: OFFSET,
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: COLOR.DIVIDER,
  },

  iconArrow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
    backgroundColor: COLOR.PRIMARY,
    tintColor: COLOR.WHITE,
    borderRadius: UNIT,
    borderWidth: 2,
    borderColor: COLOR.PRIMARY,
    padding: 2,
  },

  iconNegative: {
    backgroundColor: COLOR.ACCENT,
    borderColor: COLOR.ACCENT,
  },

  iconInactive: {
    backgroundColor: ICON_DISABLED,
    borderColor: ICON_DISABLED,
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
