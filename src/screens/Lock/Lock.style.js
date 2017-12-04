import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const {
  COLOR, FONT, FOOTER_OFFSET, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  screen: {
    backgroundColor: COLOR.PRIMARY,
    paddingBottom: FOOTER_OFFSET,
  },

  header: {
    flex: 1,
  },

  pin: {
    marginTop: OFFSET * 2,
    marginBottom: OFFSET,
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
    marginBottom: OFFSET,
  },

  keyPad: {
    width: UNIT * 10.6,
    height: UNIT * 5.6,
  },

  number: {
    color: COLOR.WHITE,
    fontSize: FONT.SIZE.LARGE,
  },

  icon: {
    tintColor: COLOR.TEXT_HIGHLIGHT,
  },

  fingerPrint: {
    minWidth: '100%',
    marginBottom: OFFSET,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  iconFingerprint: {
    marginRight: UNIT,
  },
});
