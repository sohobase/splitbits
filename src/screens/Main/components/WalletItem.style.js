import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

const CARD_SIZE = THEME.UNIT * 18;
const QR_SIZE = THEME.UNIT * 6.4;

export default StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    width: '75%',
    minHeight: CARD_SIZE,
    maxHeight: CARD_SIZE,
    backgroundColor: COLOR.WHITE,
    marginTop: OFFSET,
    marginBottom: OFFSET * 3,
    alignSelf: 'center',
    borderRadius: THEME.BORDER_RADIUS,
  },

  empty: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
  },

  content: {
    flex: 1,
    padding: OFFSET,
    minHeight: CARD_SIZE,
    maxHeight: CARD_SIZE,
  },

  info: {
    flex: 1,
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

  trend: {
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
    tintColor: COLOR.TEXT_SECONDARY,
    marginRight: UNIT / 2,
  },

  qr: {
    position: 'absolute',
    right: OFFSET,
    bottom: OFFSET,
    width: QR_SIZE,
    height: QR_SIZE,
  },

  options: {
    marginTop: OFFSET * 2,
    alignSelf: 'center',
  },

  option: {
    paddingLeft: OFFSET * 2,
    paddingRight: OFFSET * 2,
    paddingTop: OFFSET * 2,
  },

  button: {
    backgroundColor: COLOR.WHITE,
    marginBottom: UNIT / 2,
  },

  caption: {
    tintColor: COLOR.PRIMARY,
  },

  highlight: {
    color: COLOR.WHITE,
  },
});
