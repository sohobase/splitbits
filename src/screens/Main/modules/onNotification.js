import { DeviceService, TransactionService, WalletService } from '../../../services';
import { updateDeviceAction, updateTransactionsAction, updateWalletAction } from '../../../store/actions';

export default async({ data = {} }) => {
  const { device, wallet } = data;
  let response;

  if (device) {
    response = await DeviceService.state();
    if (response) updateDeviceAction(response);
  }

  if (wallet) {
    const values = Promise.all([
      WalletService.state(wallet),
      TransactionService.list(wallet),
    ]);
    if (values[0]) updateWalletAction(values[0]);
    if (values[1]) updateTransactionsAction(values[1]);
  }
};
