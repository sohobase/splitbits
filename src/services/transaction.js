import BitcoinJS from 'bitcoinjs-lib';

import { C } from '../config';
import { SecureStore } from '../store';
import { service } from './modules';

const { NETWORKS, FEES } = C;

export default {

  fees(walletId, amount, product) {
    return service(`transaction/fee?walletId=${walletId}&amount=${amount}&product=${product || ''}`);
  },

  list({ walletId, lastBlock = 0 }) {
    return service(`transaction/list?walletId=${walletId}&lastBlock=${lastBlock}`);
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },

  async send(props, { coin, address, imported }) {
    const network = BitcoinJS.networks[NETWORKS[coin]];
    const { tx: hexTx, fees } = await service('transaction/prepare', { method: 'POST', body: JSON.stringify(props) });
    const tx = BitcoinJS.TransactionBuilder.fromTransaction(BitcoinJS.Transaction.fromHex(hexTx), network);
    const secret = await SecureStore.get(`${coin}_${address}`);
    const ECPair = imported
      ? BitcoinJS.ECPair.fromWIF(secret, network)
      : BitcoinJS.HDNode.fromSeedHex(secret, network).keyPair;

    // @TODO: verify outputs are what we expect
    tx.inputs.forEach((_, i) => {
      tx.sign(i, ECPair); // @TODO try/catch
    });
    return service('transaction/send', {
      method: 'POST',
      body: JSON.stringify({
        ...props,
        charge: fees.charge,
        fee: fees[props.fee || FEES.REGULAR],
        tx: tx.build().toHex(),
      }),
    });
  },

  archive(id, walletId) {
    return service(`transaction/${id}`, { method: 'DELETE', body: JSON.stringify({ walletId }) });
  },

  update(id, props) {
    return service(`transaction/${id}`, { method: 'PUT', body: JSON.stringify(props) });
  },
};
