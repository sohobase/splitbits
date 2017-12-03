import { DeviceService, TransactionService, WalletService } from '../../../services';
import { updateDeviceAction, updateTransactionsAction, updateWalletAction } from '../../../store/actions';

export default async({
  origin, title, body, data = {},
}) => {
  const { device, wallet: walletId } = data;
  let response;
  console.log('{PUSH}', origin, title, body, origin, { device, walletId });

  if (device) {
    response = await DeviceService.state();
    if (response) updateDeviceAction(response);
  }

  if (walletId) {
    const [wallet, transactions] = Promise.all([
      WalletService.state(walletId),
      TransactionService.list(walletId),
    ]);
    if (wallet) updateWalletAction(wallet);
    if (transactions) updateTransactionsAction(transactions);
  }
};
