import { service } from './modules';

export default {

  async create(props) {
    return service('wallet', {
      method: 'POST',
      body: JSON.stringify(props),
    });
  },
};
