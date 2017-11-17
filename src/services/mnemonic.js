import bip39 from 'bip39';

export default {
  backup(hexSeed = '') {
    return bip39.entropyToMnemonic(hexSeed).split(/\s+/g);
  },

  restore(words = []) {
    return bip39.mnemonicToEntropy(words.join(' '));
  },

  validate(words = '') {
    return bip39.validateMnemonic(words);
  },
};
