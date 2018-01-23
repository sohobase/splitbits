import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const {
  COLOR, FONT, OFFSET,
} = THEME;

export default StyleSheet.create({
  warning: {
    alignSelf: 'center',
    backgroundColor: COLOR.TRANSPARENT,
    bottom: OFFSET / 2,
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    fontSize: FONT.SIZE.TINY,
    position: 'absolute',
  },
});
