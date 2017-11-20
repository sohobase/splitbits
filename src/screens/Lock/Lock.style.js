import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const {
  BUTTON_CIRCLE_SIZE, COLOR, FONT, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  screen: {
    backgroundColor: COLOR.PRIMARY,
  },

  header: {
    flex: 1,
  },

  brandname: {
    width: UNIT * 14.8,
    height: UNIT * 3.2,
    resizeMode: 'contain',
    margin: '15%',
  },

  code: {
    width: OFFSET,
    height: OFFSET,
    borderRadius: OFFSET / 2,
    margin: UNIT,
    backgroundColor: COLOR.TEXT_HIGHLIGHT_DISABLED,
  },

  codeActive: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },

  padLock: {
    flex: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },

  keyPad: {
    width: UNIT * 10.6,
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.LARGE,
    textAlign: 'center',
  },

  fingerPrint: {
    minWidth: '100%',
    marginTop: OFFSET,
    marginBottom: OFFSET,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  icon: {
    tintColor: COLOR.TEXT_HIGHLIGHT,
    marginRight: UNIT,
  },
});
