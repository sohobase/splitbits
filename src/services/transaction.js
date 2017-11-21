import { service } from './modules';

export default {

  fees(coin, amount) {
    return service(`transaction/fee?coin=${coin}&amount=${amount}`);
  },

  list(walletId) {
    return service(`transaction/list?walletId=${walletId}`);
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },

  send(props) {
    return service('transaction/send', { method: 'POST', body: JSON.stringify(props) });
  },

  archive(id, walletId) {
    return service(`transaction/archive/${id}`, { method: 'DELETE', body: JSON.stringify({ walletId }) });
  },
};
