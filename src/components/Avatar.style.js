import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { AVATAR_SIZE, COLOR } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.TEXT_DISABLED,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },

  image: {
    resizeMode: 'cover',
  },

  icon: {
    tintColor: COLOR.WHITE,
    width: AVATAR_SIZE / 2,
    height: AVATAR_SIZE / 2,
    alignSelf: 'center',
  },
});
