import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  wallets: {
    flex: 0,
    alignContent: 'center',
    minHeight: UNIT * 25.6,
    height: '45%',
    maxHeight: UNIT * 36,
  },
});
