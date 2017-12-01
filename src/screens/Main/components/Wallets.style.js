import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { OFFSET, WALLET_HEIGHT } = THEME;

export default StyleSheet.create({
  wallets: {
    height: WALLET_HEIGHT + (OFFSET * 4),
  },

  pagination: {
    bottom: OFFSET,
  },
});
