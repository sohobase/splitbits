import { StyleSheet } from 'react-native';

import { THEME } from '../config';

export default StyleSheet.create({
  icon: {
    width: THEME.ICON_SIZE,
    height: THEME.ICON_SIZE,
    resizeMode: 'cover',
  },
});
