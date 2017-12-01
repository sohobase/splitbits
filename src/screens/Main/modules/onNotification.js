import { DeviceService, TransactionService, WalletService } from '../../../services';
import { updateDeviceAction, updateTransactionsAction, updateWalletAction } from '../../../store/actions';

export default async({
  origin, title, body, data = {},
}) => {
  const { device, wallet } = data;
  let response;
  console.log('{PUSH}', origin, title, body, origin, { device, wallet });

  if (device) {
    response = await DeviceService.state(wallet);
    if (response) updateDeviceAction(response);
  }

  if (wallet) {
    response = await WalletService.state(wallet);
    if (response) updateWalletAction(response);

    response = await TransactionService.list(wallet);
    if (response) updateTransactionsAction(response);
  }
};
