import { Fingerprint } from 'expo';
import { Platform } from 'react-native';

export default {
  async isEnrolled() {
    return Fingerprint.isEnrolledAsync();
  },

  async authenticate(message) {
    const { success } = await Fingerprint.authenticateAsync(message);
    return success;
  },

  async cancel() {
    if (Platform.OS !== 'ios') Fingerprint.cancelAuthenticate();
  },
};
