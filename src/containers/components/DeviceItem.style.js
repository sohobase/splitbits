import Color from 'color';
import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { AVATAR_SIZE, COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  selected: {
    backgroundColor: Color(COLOR.PRIMARY).lighten(0.9),
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: COLOR.DIVIDER,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  avatarSelected: {
    backgroundColor: COLOR.PRIMARY,
  },

  image: {
    resizeMode: 'cover',
  },

  icon: {
    tintColor: COLOR.WHITE,
  },

  content: {
    marginLeft: OFFSET,
    flex: 1,
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

  button: {
    marginLeft: OFFSET,
    padding: UNIT,
  },

  buttonCaption: {
    fontSize: FONT.SIZE.SMALL,
  },
});
