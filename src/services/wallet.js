import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';

const { CRYPTO: { BTC }, NETWORKS } = C;

export default {
  async create({
    address, coin = BTC, hexSeed, name,
  }) {
    const network = BitcoinJS.networks[NETWORKS[coin]];

    if (!hexSeed) {
      // @TODO: Use CSPRNG
      const seed = Buffer.from([...Array(16)].map(() => Math.floor(Math.random() * 0xFF)));
      const HDWallet = BitcoinJS.HDNode.fromSeedBuffer(seed, network);
      address = HDWallet.getAddress();
      hexSeed = seed.toString('hex');
    }

    const wallet = await service('wallet', {
      method: 'POST',
      body: JSON.stringify({ address, coin, name }),
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
