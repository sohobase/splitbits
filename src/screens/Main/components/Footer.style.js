import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';
import { isIphoneX } from '../../../modules';

const { COLOR, FOOTER_SIZE, IPHONEX_OFFSET } = THEME;

export default StyleSheet.create({
  footer: {
    backgroundColor: COLOR.WHITE,
    height: FOOTER_SIZE + (isIphoneX() ? IPHONEX_OFFSET : 0),
    elevation: 0,
    alignItems: 'flex-start',
  },

  elevation: {
    elevation: 8,
  },

  option: {
    minWidth: '50%',
  },
});
