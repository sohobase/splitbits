import bs58check from 'bs58check';

import { C } from '../config';

const {
  CRYPTO: {
    BTC,
    LTC,
  },
  WALLET_VERSIONS: {
    ADDRESS_BTC,
    ADDRESS_BTC_TESTNET,
    ADDRESS_LTC,
    WIF_BTC,
    WIF_BTC_TESTNET,
    WIF_LTC,
  },
} = C;

export default (address) => {
  const buffer = bs58check.decode(address) || [];
  const version = buffer[0];

  if (version === WIF_BTC_TESTNET || version === WIF_BTC) {
    return {
      wif: address,
      coin: BTC,
    };
  }
  if (version === ADDRESS_BTC_TESTNET || version === ADDRESS_BTC) {
    return {
      address,
      coin: BTC,
    };
  }
  if (version === WIF_LTC) {
    return {
      wif: address,
      coin: LTC,
    };
  }
  if (version === ADDRESS_LTC) {
    return {
      address,
      coin: LTC,
    };
  }
  return undefined;
};
