import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  loading: {
    backgroundColor: COLOR.PRIMARY,
  },

  button: {
    marginTop: OFFSET * 2,
  },

  option: {
    position: 'absolute',
    bottom: OFFSET / 2,
  },

  optionCaption: {
    padding: OFFSET,
  },

  left: {
    alignSelf: 'flex-start',
  },

  right: {
    alignSelf: 'flex-end',
  },
});
