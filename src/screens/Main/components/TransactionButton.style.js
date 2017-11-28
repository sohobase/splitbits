import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';
import { isIphoneX } from '../../../modules';

const { FOOTER_SIZE, IPHONEX_OFFSET } = THEME;

export default StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: (FOOTER_SIZE * 0.25) + (isIphoneX() ? IPHONEX_OFFSET : 0),
    elevation: 10,
  },
});
