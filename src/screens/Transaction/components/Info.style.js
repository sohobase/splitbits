import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: COLOR.WHITE,
  },

  avatar: {
    marginRight: OFFSET,
  },

  half: {
    width: '50%',
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  value: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  title: {
    fontWeight: FONT.WEIGHT.BOLD,
  },
});
