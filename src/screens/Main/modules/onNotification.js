import { DeviceService, TransactionService, WalletService } from '../../../services';
import { instance } from '../../../store';
import { updateDeviceAction, updateTransactionsAction, updateWalletAction } from '../../../store/actions';

export default async({ data = {} }) => {
  const { device, wallet } = data;
  const { dispatch } = instance.get();

  if (device) {
    const response = await DeviceService.state();
    if (response) dispatch(updateDeviceAction(response));
  }

  if (wallet) {
    await Promise.all([
      WalletService.state(wallet).then(value => dispatch(updateWalletAction(value))),
      TransactionService.list(wallet).then(value => dispatch(updateTransactionsAction(value))),
    ]);
  }
};
