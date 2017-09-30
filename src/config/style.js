import { Platform, StatusBar, StyleSheet } from 'react-native';
import THEME from './theme';

const { COLOR, UNIT } = THEME;
let androidHeader = {};
if (Platform.OS !== 'ios') androidHeader = { paddingTop: StatusBar.currentHeight, height: 80 };

export default StyleSheet.create({
  CENTERED: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  HEADER: Object.assign({
    backgroundColor: COLOR.PRIMARY,
    elevation: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: { height: 0 },
  }, androidHeader),

  HEADER_TITLE: {
    alignSelf: 'center',
  },

  LAYOUT_TOP: {
    flex: 0,
    // minHeight: '45%',
    minHeight: UNIT * 25.6,
    height: '45%',
    maxHeight: UNIT * 36,
    // maxHeight: UNIT * 19,
    backgroundColor: COLOR.PRIMARY,
  },

  LAYOUT_BOTTOM: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },

  ROW: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  COL: {
    display: 'flex',
    flexDirection: 'column',
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
