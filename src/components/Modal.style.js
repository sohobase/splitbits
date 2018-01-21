import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const {
  COLOR, FONT, MODAL_PADDING_BOTTOM, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: COLOR.BACKGROUND_DISABLED,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },

  content: {
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: UNIT,
    borderTopRightRadius: UNIT,
    marginBottom: -OFFSET,
    paddingBottom: MODAL_PADDING_BOTTOM,
  },

  header: {
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
  },

  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    marginTop: 1.9 * UNIT,
  },

  button: {
    alignSelf: 'flex-end',
    marginRight: UNIT,
  },

  buttonCaption: {
    tintColor: COLOR.TEXT_DISABLED,
  },

  hint: {
    alignSelf: 'center',
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
    marginLeft: OFFSET,
    marginRight: OFFSET,
    marginTop: UNIT,
    marginBottom: UNIT,
    textAlign: 'center',
  },
});
