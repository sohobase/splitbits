import { service } from './modules';

export default {

  async update(props = {}, action) {
    const response = await service('device', { method: 'PUT', body: JSON.stringify(props) });
    if (response) action(response);
  },

  add(data) {

  },

  remove(data) {

  },

  settings(data) {

  },
};
