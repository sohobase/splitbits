import { C } from '../../../config';
import { TransactionService } from '../../../services';

const { SATOSHI, TYPE: { REQUEST } } = C;

export default async(component) => {
  const {
    props: {
      deviceId, type, wallet,
      item: { id } = {},
    },
    state: { address, amount, concept },
  } = component;
  const { coin, id: walletId } = wallet;

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
  };

  return TransactionService[method](params, wallet);
};
