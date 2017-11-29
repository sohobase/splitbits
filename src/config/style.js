import { StyleSheet } from 'react-native';
import THEME from './theme';

const {
  COLOR, HEADER_SIZE, UNIT, OFFSET, ROW_MIN_HEIGHT, WALLET_HEIGHT,
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

  LAYOUT_TOP: {
    flex: 0,
    height: WALLET_HEIGHT + HEADER_SIZE + (OFFSET * 4),
    backgroundColor: COLOR.PRIMARY,
  },

  LTC: {
    backgroundColor: COLOR.ACCENT,
  },

  LAYOUT_BOTTOM: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },

  LIST_ITEM: {
    // flex: 1,
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
    backgroundColor: COLOR.PRIMARY,
  },

  SWIPER_DOT: {
    zIndex: 1,
    width: UNIT * 0.6,
    height: UNIT * 0.6,
    backgroundColor: COLOR.BACKGROUND_DARK,
  },

  SWIPER_DOT_ACTIVE: {
    backgroundColor: COLOR.WHITE,
  },
});
