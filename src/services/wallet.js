import { PushService } from './';
import { service } from './modules';

export default {

  async create(props) {
    const params = {
      ...props,
      push: await PushService.getToken(),
    };

    return service('wallet', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
};
