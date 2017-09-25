import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  main: {},

  wallets: {},

  activity: {
    backgroundColor: COLOR.BACKGROUND,
  },

  footer: {
    backgroundColor: COLOR.WHITE,
    height: FOOTER_SIZE,
    shadowColor: COLOR.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: FOOTER_SIZE * 0.25,
  },
});
