import { StyleSheet } from 'react-native';

import { THEME } from '../../config';

const {
  COLOR, FOOTER_OFFSET, UNIT, OFFSET,
} = THEME;

export default StyleSheet.create({
  screen: {
    backgroundColor: COLOR.PRIMARY,
    paddingBottom: FOOTER_OFFSET,
  },

  header: {
    flex: 1,
  },

  icon: {
    tintColor: COLOR.TEXT_HIGHLIGHT_SECONDARY,
  },

  fingerPrint: {
    minWidth: '100%',
    marginBottom: OFFSET,
  },

  hint: {
    color: COLOR.TEXT_HIGHLIGHT_SECONDARY,
    textAlign: 'center',
    marginHorizontal: OFFSET,
  },

  iconFingerprint: {
    marginRight: UNIT,
  },
});
