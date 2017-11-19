import bs58check from 'bs58check';
import { C } from '../../config';

const { CRYPTO: { BTC, LTC }, WALLET: { ADDRESS, WIF } } = C;

export default (address) => {
  const buffer = bs58check.decode(address) || [];
  const version = buffer[0];

  let type;
  if (version === WIF.BTC_TESTNET || version === WIF.BTC) {
    type = { wif: address, coin: BTC };
  } else if (version === ADDRESS.BTC_TESTNET || version === ADDRESS.BTC) {
    type = { address, coin: BTC };
  } else if (version === WIF.LTC) {
    type = { wif: address, coin: LTC };
  } else if (version === ADDRESS.LTC) {
    type = { address, coin: LTC };
  }

  return type;
};
