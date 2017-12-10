import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const {
  COLOR, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  container: {
    flex: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-end',
    marginBottom: OFFSET,
  },

  key: {
    width: UNIT * 10.6,
    height: UNIT * 5.6,
  },

  number: {
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.LARGE,
  },

  icon: {
    tintColor: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },
});
