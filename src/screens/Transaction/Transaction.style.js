import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
  },

  centered: {
    alignSelf: 'center',
  },

  caption: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_DISABLED,
    marginBottom: OFFSET,
  },

  error: {
    textAlign: 'center',
    marginHorizontal: OFFSET,
  },
});
