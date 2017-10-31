import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({

  device: {
    borderBottomWidth: 0,
    width: '100%',
    minWidth: '90%',
    minHeight: 'auto',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  hint: {
    fontSize: FONT.SIZE.LARGE,
    color: COLOR.TEXT_DISABLED,
    opacity: 0.7,
  },

  input: {
    flex: 1,
  },

  icon: {
    tintColor: COLOR.TEXT_SECONDARY,
  },
});
