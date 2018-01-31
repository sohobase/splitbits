import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  WALLET_HEIGHT, UNIT,
} = THEME;

export default StyleSheet.create({
  wallets: {
    height: WALLET_HEIGHT,
    paddingTop: UNIT / 2,
  },

  item: {
    alignSelf: 'flex-start',
  },
});
