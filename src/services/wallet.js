import { NotidicationsService } from './';
import { service } from './modules';

export default {

  async create(props) {
    const params = {
      ...props,
      push: await NotidicationsService.getToken(),
    };

    return service('wallet', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
};
