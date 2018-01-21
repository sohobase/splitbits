import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { COLOR, FONT, OFFSET } = THEME;

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
    padding: OFFSET,
  },

  coin: {
    minWidth: '33%',
    opacity: 0.5,
  },

  coinActive: {
    opacity: 1,
  },

  input: {
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
    textAlign: 'center',
  },

  inputAddress: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  button: {
    marginTop: OFFSET,
    marginLeft: OFFSET,
    marginRight: OFFSET,
  },
});
