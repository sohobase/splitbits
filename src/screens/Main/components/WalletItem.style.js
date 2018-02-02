import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const {
  BORDER_RADIUS, COLOR, FONT, LAYOUT, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  address: {
    justifyContent: 'space-between',
    paddingVertical: UNIT / 2,
  },

  amount: {
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  amounts: {
    flex: 1,
    alignItems: 'flex-start',
  },

  bold: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  date: {
    flex: 1,
  },

  typeWriter: {
    fontFamily: 'pt-mono-regular',
    fontSize: UNIT * 1.4,
    letterSpacing: UNIT / 3.5,
  },

  coinLogo: {
    alignSelf: 'flex-end',
    width: FONT.SIZE.LARGE,
    height: FONT.SIZE.LARGE,
  },

  container: {
    width: LAYOUT.WALLET_WIDTH,
    height: LAYOUT.WALLET_HEIGHT,
    borderRadius: BORDER_RADIUS,
  },

  containerDefault: {
    backgroundColor: COLOR.WHITE,
  },

  containerEmpty: {
    backgroundColor: COLOR.BACKGROUND_HIGHLIGHT,
    elevation: 0,
  },

  content: {
    paddingTop: OFFSET,
    paddingBottom: UNIT,
    paddingHorizontal: OFFSET,
    height: '100%',
  },

  fiat: {
    fontSize: FONT.SIZE.SMALL,
    opacity: 0.75,
  },

  tags: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  text: {
    color: COLOR.DEFAULT,
  },

  textHighlight: {
    color: COLOR.TEXT_HIGHLIGHT,
  },

  option: {
    marginVertical: UNIT,
    marginHorizontal: UNIT / 4,
  },

  optionLabel: {
    fontSize: FONT.SIZE.TINY,
    fontWeight: FONT.WEIGHT.BOLD,
    color: COLOR.TEXT_HIGHLIGHT,
  },

  button: {
    backgroundColor: COLOR.WHITE,
    transform: [{ scale: 0.75 }],
  },

  buttonCaption: {
    tintColor: COLOR.PRIMARY,
  },

  highlight: {
    color: COLOR.WHITE,
  },
});
