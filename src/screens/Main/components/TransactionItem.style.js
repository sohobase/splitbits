import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, UNIT, OFFSET } = THEME;
const IMAGE_SIZE = THEME.BUTTON_CIRCLE_SIZE * 0.65;

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
    width: FONT.SIZE.DEFAULT,
    height: FONT.SIZE.DEFAULT,
    backgroundColor: COLOR.PRIMARY,
    tintColor: COLOR.WHITE,
    borderRadius: UNIT,
    borderWidth: 1,
    borderColor: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  iconNegative: {
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
