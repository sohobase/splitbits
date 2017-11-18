import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  wallets: {
    flex: 0,
    height: '95%',
    alignSelf: Platform.OS === 'ios' ? 'flex-end' : 'auto',
  },
});
