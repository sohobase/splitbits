import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: COLOR.WHITE,
  },

  avatar: {
    marginRight: OFFSET,
  },

  half: {
    width: '50%',
  },

  value: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  title: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  input: {
    width: '100%',
    fontSize: FONT.SIZE.DEFAULT,
  },
});
