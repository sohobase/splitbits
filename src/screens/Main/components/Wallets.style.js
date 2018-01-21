import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { OFFSET, WALLET_HEIGHT } = THEME;

export default StyleSheet.create({
  wallets: {
    height: '100%',
    marginBottom: OFFSET,
    minHeight: WALLET_HEIGHT + (OFFSET * 2),
  },

  item: {
    alignSelf: 'center',
  },
});
