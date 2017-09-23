import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

const QR_SIZE = THEME.UNIT * 8;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '75%',
    backgroundColor: COLOR.WHITE,
    margin: THEME.OFFSET,
    padding: THEME.OFFSET,
    borderRadius: THEME.BORDER_RADIUS,
  },

  info: {
    flex: 1,
    alignSelf: 'flex-end',
  },

  name: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  amount: {
    color: COLOR.TEXT_DEFAULT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  fiat: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  qr: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: QR_SIZE,
    height: QR_SIZE,
  },
});
