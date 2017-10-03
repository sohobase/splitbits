import { service } from './modules';

export default {

  get(wallets) {
    return service(`state?wallets=${wallets}`, {
      method: 'GET',
    });
  },
};
