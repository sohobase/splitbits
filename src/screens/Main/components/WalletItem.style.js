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
    backgroundColor: COLOR.WHITE,
    borderRadius: BORDER_RADIUS,
  },

  containerPRO: {
    backgroundColor: COLOR.ACCENT,
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

  tag: {
    padding: UNIT / 2,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR.PLACEHOLDER_HIGHLIGHT,
  },

  tagLabel: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
    fontSize: FONT.SIZE.TINY,
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
