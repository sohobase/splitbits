import { StyleSheet } from 'react-native';

import { THEME } from '../config';

const { UNIT } = THEME;

export default StyleSheet.create({
  logo: {
    width: UNIT * 14.8,
    height: UNIT * 3.2,
    resizeMode: 'contain',
  },
});
