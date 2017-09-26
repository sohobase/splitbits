import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, ICON_SIZE, OFFSET, UNIT } = THEME;

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
  },

  header: {
    paddingLeft: OFFSET,
    paddingTop: UNIT,
    paddingBottom: UNIT,
  },

  title: {
    flex: 1,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  buttonClose: {
    marginLeft: ICON_SIZE * -1,
    right: UNIT,
    opacity: THEME.DISABLED,
  },

  children: {
    paddingBottom: OFFSET,
  },
});
