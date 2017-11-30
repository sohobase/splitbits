import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const {
  COLOR, FONT, HEADER_SIZE, OFFSET, WALLET_HEIGHT, UNIT,
} = THEME;

export default StyleSheet.create({
  wallets: {
    height: WALLET_HEIGHT + (OFFSET * 4),
  },

  pagination: {
    bottom: OFFSET,
  },

  env: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: HEADER_SIZE - (2.5 * OFFSET),
    right: OFFSET,
    backgroundColor: COLOR.ACCENT,
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.TINY,
    fontWeight: FONT.WEIGHT.BOLD,
    paddingTop: UNIT / 4,
    paddingBottom: UNIT / 4,
    paddingLeft: UNIT / 2,
    paddingRight: UNIT / 2,
  },
});
