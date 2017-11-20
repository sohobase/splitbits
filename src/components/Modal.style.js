import { Platform, StyleSheet } from 'react-native';
import { THEME } from '../config';

const {
  COLOR, FONT, OFFSET, UNIT,
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
    paddingBottom: 2 * OFFSET,
  },

  header: {
    paddingTop: OFFSET,
    paddingBottom: OFFSET,
    borderBottomColor: COLOR.DIVIDER,
    borderBottomWidth: 1,
  },

  title: {
    alignSelf: 'center',
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  buttonClose: {
    position: 'absolute',
    right: UNIT,
    top: Platform.OS === 'ios' ? -(OFFSET + UNIT) : OFFSET,
    // top: -(OFFSET + UNIT),
  },

  buttonCloseCaption: {
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
