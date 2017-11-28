import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';
import { PushService } from './';
import { csprng } from '../modules';

const { CRYPTO: { BTC }, NETWORKS } = C;

export default {
  async create(params) {
    const { coin, name } = params;
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const hexSeed = params.hexSeed || (await csprng()).substring(0, 32);
    const address = params.address || BitcoinJS.HDNode.fromSeedHex(hexSeed, network).getAddress();

    const wallet = await service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        address,
        coin,
        name,
        push: await PushService.getToken(),
      }),
    });

    return ({ ...wallet, hexSeed });
  },

  async import(props) {
    const {
      wif,
      coin = BTC,
      address,
      ...inherit
    } = props;
    const network = BitcoinJS.networks[NETWORKS[coin]];

    const wallet = await service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        ...inherit,
        address: wif ? BitcoinJS.ECPair.fromWIF(wif, network).getAddress() : address,
        coin,
        imported: true,
        readOnly: (wif === undefined),
      }),
    });

    return ({ ...wallet, wif });
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
