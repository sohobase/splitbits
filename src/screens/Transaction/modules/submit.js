import { C } from '../../../config';
import { TransactionService } from '../../../services';

const { SATOSHI, TYPE: { REQUEST } } = C;

export default async(component) => {
  const {
    props: {
      recipient = {}, type, wallet,
      item: { id, amount: itemAmount } = {},
    },
    state: { amount, concept },
  } = component;
  const { coin, id: walletId } = wallet;

  const isRequest = type === REQUEST;
  const method = isRequest && !id ? 'request' : 'send';
  const params = {
    address: recipient.wallet ? recipient.wallet.address : recipient.address,
    amount: itemAmount || parseInt(amount / SATOSHI, 10),
    coin,
    concept,
    deviceId: recipient.device ? recipient.device.id : undefined,
    id,
    walletId,
  };

  return TransactionService[method](params, wallet);
};
