import BitcoinJS from 'bitcoinjs-lib';
import BitcoinMessage from 'bitcoinjs-message';

import { C } from '../config';
import { SecureStore } from '../store';
import { service } from './modules';
import EntropyService from './entropy';
import PushService from './push';

const { CRYPTO: { BTC }, NETWORKS } = C;

const getSignature = (ecPair) => {
  const timestamp = (new Date()).getTime();
  const signatureMessage = `SplitBits Add Wallet ${timestamp}$`;
  const signature = BitcoinMessage.sign(signatureMessage, ecPair.d.toBuffer(32), ecPair.compressed).toString('base64');
  return { signature, timestamp };
};

export default {
  async create({ coin = BTC, name, ...props }) {
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const hexSeed = props.hexSeed || await EntropyService();
    const hdNode = BitcoinJS.HDNode.fromSeedHex(hexSeed, network);
    const address = hdNode.getAddress();

    if (hexSeed) await SecureStore.set(`${coin}_${address}`, hexSeed);
    const wallet = service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        address,
        coin,
        name,
        payload: getSignature(hdNode.keyPair),
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
    const ecPair = wif && BitcoinJS.ECPair.fromWIF(wif, network);
    const address = wif ? ecPair.getAddress() : readOnlyAddress;

    if (wif) await SecureStore.set(`${coin}_${address}`, wif);
    const wallet = service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        ...inherit,
        coin,
        address,
        imported: true,
        readOnly: (wif === undefined),
        payload: wif && getSignature(ecPair),
      }),
    });

    return wallet; // @TODO: Dispatch error if doesnt exist.
  },

  state({ id, ids }) {
    return service(`wallet?${id ? `id=${id}` : `ids=${ids}`}`);
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
