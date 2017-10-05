import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { AVATAR_SIZE, COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    padding: OFFSET,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  image: {
    width: AVATAR_SIZE / 2,
    height: AVATAR_SIZE / 2,
    resizeMode: 'cover',
    backgroundColor: COLOR.DIVIDER,
    borderRadius: AVATAR_SIZE / 4,
    marginRight: OFFSET,
  },

  name: {
    fontSize: FONT.SIZE.DEFAULT,
    fontWeight: FONT.WEIGHT.BOLD,
    lineHeight: FONT.SIZE.LARGE,
  },

  private: {
    color: COLOR.TEXT_SECONDARY,
  },

  hint: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_SECONDARY,
  },
});
