import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const {
  COLOR, FONT, ICON_SIZE, OFFSET, UNIT,
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
    paddingBottom: UNIT,
  },

  title: {
    alignSelf: 'center',
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
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

  buttonClose: {
    position: 'absolute',
    right: UNIT,
    top: -(OFFSET + UNIT),
  },

  buttonCloseCaption: {
    tintColor: COLOR.TEXT_DISABLED,
  },
});
