import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { BUTTON_CIRCLE_SIZE, FOOTER_OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: BUTTON_CIRCLE_SIZE / 2,
    bottom: FOOTER_OFFSET,
  },

  button: {
    elevation: 10,
  },
});
