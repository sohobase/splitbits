import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  loading: {
    backgroundColor: COLOR.PRIMARY,
  },

  options: {
    position: 'absolute',
    width: '100%',
    bottom: OFFSET / 2,
  },

  option: {
    padding: OFFSET,
  },

  left: {
    minWidth: '50%',
    alignItems: 'flex-start',
  },

  right: {
    minWidth: '50%',
    alignItems: 'flex-end',
  },

  button: {
    marginTop: OFFSET,
  },
});
