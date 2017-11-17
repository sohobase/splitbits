import Bitcoinjs from 'bitcoinjs-lib';
import BigInteger from 'bigi';
import bip39 from 'bip39';
import wif from 'wif';
import { C } from '../config';

export default {
  backup(wifKey = '') {
    const { version, privateKey } = wif.decode(wifKey);
    // @TODO: validate version
    console.log(version, privateKey);
    return bip39.entropyToMnemonic(privateKey);
  },

  restore(words = [], coin = '') {
    const strWords = words.join(' ');

    const seed = Buffer.from(bip39.mnemonicToEntropy(strWords), 'hex');
    console.log(seed);
    const network = Bitcoinjs.networks[C.CRYPTO_NAMES[coin]];
    return (new Bitcoinjs.ECPair(BigInteger.fromBuffer(seed), null, { network })).toWIF();
  },

  validate(words = '') {
    return bip39.validateMnemonic(words);
  },
};
