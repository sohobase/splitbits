import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  loading: {
    backgroundColor: COLOR.PRIMARY,
  },

  buttonWallet: {
    marginTop: OFFSET * 2,
  },

  option: {
    position: 'absolute',
    bottom: UNIT / 3,
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
