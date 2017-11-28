import { SecureStore } from 'expo';

const PROPS = { keychainAccessible: SecureStore.WHEN_UNLOCKED };

export default {

  async set(key, value) {
    return SecureStore.setItemAsync(key, value, PROPS);
  },

  async get(key) {
    return SecureStore.getItemAsync(key);
  },
};
