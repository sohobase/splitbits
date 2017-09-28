import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  loading: {
    backgroundColor: COLOR.PRIMARY,
  },

  buttonWallet: {
    // marginTop: OFFSET,
    position: 'absolute',
    alignSelf: 'flex-start',
    // bottom: 0,
    // width: '90%',
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
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
