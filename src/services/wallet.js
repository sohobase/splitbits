import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';

const { CRYPTO_NAMES } = C;

export default {
  async create({ coin, name }) {
    const network = BitcoinJS.networks[CRYPTO_NAMES[coin]];
    // @TODO: Use CSPRNG
    const seed = Buffer.from([...Array(16)].map(() => Math.floor(Math.random() * 0xFF)));
    const HDWallet = BitcoinJS.HDNode.fromSeedBuffer(seed, network);
    const address = HDWallet.getAddress();

    const wallet = await service('wallet', {
      method: 'POST',
      body: JSON.stringify({ address, coin, name }),
    });

    return ({ ...wallet, hexSeed: seed.toString('hex') });
  },

  async import({ address, wif, ...props }) {
    if (wif) address = BitcoinJS.ECPair.fromWIF(wif).getAddress();

    const wallet = await service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        ...props, address, imported: true, readOnly: (wif === undefined),
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
};
