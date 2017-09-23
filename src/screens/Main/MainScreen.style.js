import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR } = THEME;

export default StyleSheet.create({
  main: {
    // padding: THEME.OFFSET,
  },

  wallets: {
    // flex: 1,
    // alignItems: 'flex-start',
    // width: '100%',
    // width: '80%',
    // backgroundColor: 'red',
  },

  activity: {
    // flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },

  footer: {
    backgroundColor: COLOR.WHITE,
    height: THEME.UNIT * 5.6,
    shadowColor: COLOR.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  action: {
    top: THEME.BUTTON_CIRCLE_SIZE * -0.25,
  },
});
