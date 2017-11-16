import './node-hacks'
import bitcoinjs from 'bitcoinjs-lib'
import BigInteger from 'bigi'
import wif from 'wif'
import { C } from '../config'
import bip39 from 'bip39'

export default {
  /**
   * Convert private key (in WIF) to recovery words
   */
  backup(priv_wif) {
    const {version, privateKey} = wif.decode(priv_wif);
    // TODO: validate version
    console.log(privateKey)
    return bip39.entropyToMnemonic(privateKey);
  },

  /**
   * Convert words to private key (in WIF)
   */
  restore(words, coin) {
    const seed = Buffer.from(bip39.mnemonicToEntropy(words), 'hex');
    console.log(seed)
    const network = bitcoinjs.networks[C.CRYPTO_NAMES[coin]]
    return (new bitcoinjs.ECPair(BigInteger.fromBuffer(seed), null, { network })).toWIF();
  },

  /**
   * Validate a list of words (internal checksum)
   */
  validate(words) {
    return bip39.validateMnemonic(words);
  },
}

