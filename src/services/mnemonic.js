import bip39 from 'bip39';

export default {
  backup(hexSeed = '') {
    return bip39.entropyToMnemonic(hexSeed).split(/\s+/g);
  },

  restore(words = []) {
    let hexSeed;
    try {
      hexSeed = bip39.mnemonicToEntropy(words.join(' '));
    } catch (e) {
      hexSeed = undefined;
    }
    return hexSeed;
  },

  validate(words = '') {
    return bip39.validateMnemonic(words);
  },
};
