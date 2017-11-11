import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { FOOTER_SIZE, UNIT } = THEME;

export default StyleSheet.create({
  wallets: {
    flex: 0,
    alignContent: 'center',
    minHeight: UNIT * 25.6,
    height: '45%',
    maxHeight: UNIT * 36,
  },

  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: FOOTER_SIZE * 0.25,
  },
});
