import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { BUTTON_CIRCLE_SIZE, COLOR, FOOTER_SIZE, UNIT } = THEME;

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
    top: BUTTON_CIRCLE_SIZE * -0.25,
    marginLeft: UNIT,
    marginRight: UNIT,
  },
});
