import { service } from './modules';

export default {

  list(walletId) {
    return service(`transaction/list?wallet=${walletId}`);
  },
};
