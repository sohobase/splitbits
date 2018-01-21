import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  item: {
    borderBottomWidth: 0,
    width: '100%',
    minWidth: '90%',
    minHeight: 'auto',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  friend: {
    flex: 1,
  },

  value: {
    flex: 1,
    fontSize: FONT.SIZE.LARGE,
    lineHeight: FONT.SIZE.LARGE,
    maxHeight: FONT.SIZE.LARGE,
  },

  placeholder: {
    color: COLOR.TEXT_DISABLED,
    //   opacity: 0.675,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },
});
