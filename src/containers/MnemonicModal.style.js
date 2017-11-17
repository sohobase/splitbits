import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({

  words: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  input: {
    margin: UNIT / 2,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  word: {
    textAlign: 'center',
    width: '27.5%',
  },

  hint: {
    alignSelf: 'center',
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    marginLeft: OFFSET,
    marginRight: OFFSET,
    marginTop: UNIT,
    marginBottom: UNIT,
    textAlign: 'center',
  },

  button: {
    marginTop: OFFSET,
    marginLeft: OFFSET,
    marginRight: OFFSET,
  },
});
