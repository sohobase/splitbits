import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  buttons: {
    margin: OFFSET,
  },

  buttonCancel: {
    marginTop: OFFSET,
  },

  content: {
    backgroundColor: 'white',
  },

  centered: {
    alignSelf: 'center',
  },

  caption: {
    fontSize: FONT.SIZE.SMALL,
    color: COLOR.TEXT_DISABLED,
    marginBottom: UNIT,
  },

  error: {
    textAlign: 'center',
    marginHorizontal: OFFSET,
  },
});
