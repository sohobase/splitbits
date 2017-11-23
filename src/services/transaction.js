import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';

const { NETWORKS } = C;

export default {

  fees(coin, amount) {
    return service(`transaction/fee?coin=${coin}&amount=${amount}`);
  },

  list(walletId) {
    return service(`transaction/list?walletId=${walletId}`);
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },

  async send(props, { coin, wif, hexSeed }) {
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const { tx: hexTx, fee } = await service('transaction/prepare', { method: 'POST', body: JSON.stringify(props) });
    const tx = BitcoinJS.TransactionBuilder.fromTransaction(BitcoinJS.Transaction.fromHex(hexTx), network);
    const ECPair = wif
      ? BitcoinJS.ECPair.fromWIF(wif, network)
      : BitcoinJS.HDNode.fromSeedHex(hexSeed, network).keyPair;

    // @TODO: verify outputs are what we expect
    tx.inputs.forEach((_, i) => {
      tx.sign(i, ECPair); // @TODO try/catch
    });
    const body = JSON.stringify({ ...props, fee, tx: tx.build().toHex() });
    return service('transaction/send', { method: 'POST', body });
  },

  archive(id, walletId) {
    return service(`transaction/archive/${id}`, { method: 'DELETE', body: JSON.stringify({ walletId }) });
  },
};
