import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  coins: {
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
    borderTopColor: COLOR.DIVIDER,
    borderTopWidth: 1,
    padding: OFFSET,
  },

  coin: {
    minWidth: '50%',
    opacity: 0.5,
  },

  coinActive: {
    opacity: 1,
  },

  input: {
    marginBottom: OFFSET,
    fontSize: FONT.SIZE.LARGE,
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
    paddingLeft: UNIT / 4,
    paddingRight: UNIT / 4,
    textAlign: 'center',
  },

  inputActive: {
    borderBottomColor: COLOR.ACCENT,
    borderBottomWidth: 2,
  },

  inputAddress: {
    fontSize: FONT.SIZE.TINY,
  },

  button: {
    marginLeft: OFFSET,
    marginRight: OFFSET,
  },
});
