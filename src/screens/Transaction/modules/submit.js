import { C } from '../../../config';
import { TransactionService } from '../../../services';

const { SATOSHI, TYPE: { REQUEST } } = C;

export default async(component) => {
  const {
    props: {
      deviceId, type, wallet,
      item: { id, amount: itemAmount } = {},
    },
    state: { address, amount, concept },
  } = component;
  const { coin, id: walletId } = wallet;

  const isRequest = type === REQUEST;
  const method = isRequest && !id ? 'request' : 'send';
  const params = {
    address,
    amount: itemAmount || parseInt(amount / SATOSHI, 10),
    coin,
    concept,
    deviceId,
    id,
    walletId,
  };

  return TransactionService[method](params, wallet);
};
