import BitcoinJS from 'bitcoinjs-lib';
import { C } from '../../../config';
import { TransactionService } from '../../../services';

const { SATOSHI, TYPE: { REQUEST } } = C;

export default async(component) => {
  const {
    props: {
      deviceId, type,
      item: { id } = {},
      wallet: {
        coin,
        wif,
        hexSeed,
        id: walletId,
      },
    },
    state: { address, amount, concept },
  } = component;

  const isRequest = type === REQUEST;
  const method = isRequest ? 'request' : 'send';
  const params = {
    address,
    amount: parseInt(amount / SATOSHI, 10),
    coin,
    concept,
    deviceId,
    id,
    walletId,
    wif: !isRequest
      ? wif || BitcoinJS.HDNode.fromSeedHex(hexSeed).keyPair.toWIF()
      : undefined,
  };

  return TransactionService[method](params);
};
