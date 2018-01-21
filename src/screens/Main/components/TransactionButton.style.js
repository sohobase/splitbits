import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { FOOTER_OFFSET, FOOTER_SIZE } = THEME;

export default StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: (FOOTER_SIZE * 0.3) + FOOTER_OFFSET,
    elevation: 10,
  },
});
