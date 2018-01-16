import BitcoinJS from 'bitcoinjs-lib';
import bs58check from 'bs58check';
import { C } from '../../config';

const { CRYPTO: { BTC, LTC }, WALLET: { ADDRESS, WIF } } = C;

export default (address) => {
  let type;
  let version;

  try {
    const script = BitcoinJS.address.toOutputScript(address);
    if (script[0] === 169) version = script[0];
  } catch (e) { version = undefined; }

  console.log('1', version);

  if (!version) {
    try {
      const buffer = bs58check.decode(address) || [];
      version = buffer[0];
    } catch (e) { version = undefined; }
  }

  console.log('2', version);

  if ([WIF.BTC, WIF.BTC_TESTNET].includes(version)) {
    type = { wif: address, coin: BTC };
  } else if ([ADDRESS.BTC, ADDRESS.BTC_SEGWIT, ADDRESS.BTC_TESTNET].includes(version)) {
    type = { address, coin: BTC };
  } else if (version === WIF.LTC) {
    type = { wif: address, coin: LTC };
  } else if (version === ADDRESS.LTC) {
    type = { address, coin: LTC };
  }

  return type;
};
