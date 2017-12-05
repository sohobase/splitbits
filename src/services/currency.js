import { service } from './modules';

export default {

  async list() {
    return service('currencies');
  },
};
