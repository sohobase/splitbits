import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { COLOR, FONT, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // width: '100%',
    // height: '100%',
    justifyContent: 'flex-end',
    marginLeft: UNIT * 0.1,
    marginRight: UNIT * 0.1,
  },

  content: {
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: UNIT,
    borderTopRightRadius: UNIT,
    padding: OFFSET,
  },

  header: {
    marginBottom: OFFSET,
  },

  title: {
    flex: 1,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    textAlign: 'center',
  },

  close: {
    marginLeft: UNIT * -2.8,
    marginRight: 0,
    opacity: 0.5,
  },
});
