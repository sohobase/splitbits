import { service } from './modules';

export default {

  list(walletId) {
    return service(`transaction/list?wallet=${walletId}`);
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },
};
