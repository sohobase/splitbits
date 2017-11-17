import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({

  words: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  input: {
    width: '27.5%',
    margin: UNIT / 2,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  text: {
    textAlign: 'center',
    width: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
  },

  button: {
    marginTop: OFFSET,
    marginLeft: OFFSET,
    marginRight: OFFSET,
  },
});
