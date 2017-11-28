import BitcoinJS from 'bitcoinjs-lib';
import { C } from '../config';
import { csprng } from '../modules';
import { SecureStore } from '../store';
import { service } from './modules';
import { PushService } from './';

const { CRYPTO: { BTC }, NETWORKS } = C;

export default {
  async create(params) {
    const { coin, name } = params;
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const hexSeed = params.hexSeed || (await csprng()).substring(0, 32);
    const address = params.address || BitcoinJS.HDNode.fromSeedHex(hexSeed, network).getAddress();

    if (hexSeed) await SecureStore.set(`${coin}_${address}`, hexSeed);
    const wallet = service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        address,
        coin,
        name,
        push: await PushService.getToken(),
      }),
    });

    return wallet; // @TODO: Dispatch error if doesnt exist.
  },

  async import(props) {
    const {
      wif,
      coin = BTC,
      address: readOnlyAddress,
      ...inherit
    } = props;
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const address = wif ? BitcoinJS.ECPair.fromWIF(wif, network).getAddress() : readOnlyAddress;

    if (wif) await SecureStore.set(`${coin}_${address}`, wif);
    const wallet = service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        ...inherit,
        coin,
        address,
        imported: true,
        readOnly: (wif === undefined),
      }),
    });

    return wallet; // @TODO: Dispatch error if doesnt exist.
  },

  async archive(props) {
    return service('wallet', {
      method: 'DELETE',
      body: JSON.stringify(props),
    });
  },

  addressFromHexSeed(hexSeed, coin = BTC) {
    if (!hexSeed) return undefined;

    const network = BitcoinJS.networks[NETWORKS[coin]];
    return BitcoinJS.HDNode.fromSeedHex(hexSeed, network).keyPair.getAddress();
  },
};
