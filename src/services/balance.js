import { service } from './modules';

export default {

  async get(wallets) {
    return service(`balance?wallets=${wallets}`, {
      method: 'GET',
    });
  },
};
