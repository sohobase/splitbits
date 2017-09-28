import { Platform, StatusBar, StyleSheet } from 'react-native';
import THEME from './theme';

const { COLOR } = THEME;
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
    flex: 1,
    height: '40%',
    minHeight: '40%',
    maxHeight: '40%',
    backgroundColor: COLOR.PRIMARY,
  },

  LAYOUT_BOTTOM: {
    flex: 0,
    minHeight: '50%',
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
});
