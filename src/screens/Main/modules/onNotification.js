import { DeviceService, TransactionService, WalletService } from '../../../services';
import { instance } from '../../../store';
import { updateDeviceAction, updateTransactionsAction, updateWalletAction } from '../../../store/actions';

export default async({ data = {} }) => {
  const { device, wallet } = data;
  const { dispatch } = instance.get();

  if (device) await DeviceService.state().then(value => value && dispatch(updateDeviceAction(value)));

  if (wallet) {
    await Promise.all([
      WalletService.state({ id: wallet }).then(value => value && dispatch(updateWalletAction(value))),
      TransactionService.list(wallet).then(value => value && dispatch(updateTransactionsAction(value))),
    ]);
  }
};
