import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, OFFSET, UNIT } = THEME;

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

  button: {
    marginTop: OFFSET,
    marginLeft: OFFSET,
    marginRight: OFFSET,
  },
});
