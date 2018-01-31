import { StyleSheet } from 'react-native';
import THEME from './theme';

const {
  COLOR, FONT, HEADER_SIZE, LAYOUT, UNIT, OFFSET, ROW_MIN_HEIGHT,
} = THEME;

export default StyleSheet.create({
  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  COL: {
    display: 'flex',
    flexDirection: 'column',
  },

  ELEVATION: {
    elevation: 8,
    shadowColor: COLOR.BLACK,
    shadowOffset: { height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  HEADER_HIGHLIGHT: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
  },

  BTC: {
    backgroundColor: COLOR.BTC,
  },

  ETH: {
    backgroundColor: COLOR.ETH,
  },

  LABEL: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    marginBottom: UNIT / 4,
  },

  LTC: {
    backgroundColor: COLOR.LTC,
  },

  LAYOUT_TOP: {
    flex: 0,
    height: LAYOUT.WALLET_HEIGHT + HEADER_SIZE + (OFFSET * 2),
    backgroundColor: COLOR.PRIMARY,
  },

  LAYOUT_BOTTOM: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },

  LIST_ITEM: {
    width: '100%',
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
    paddingTop: UNIT * 1.2,
    paddingBottom: UNIT * 1.2,
    paddingLeft: OFFSET,
    paddingRight: OFFSET,
    minHeight: ROW_MIN_HEIGHT,
  },

  ROW: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  SCREEN: {
    flex: 1,
  },

  SWIPER_DOT: {
    zIndex: 1,
    width: UNIT * 0.6,
    height: UNIT * 0.6,
    backgroundColor: COLOR.BACKGROUND_DISABLED,
  },

  SWIPER_DOT_ACTIVE: {
    backgroundColor: COLOR.WHITE,
  },
});
