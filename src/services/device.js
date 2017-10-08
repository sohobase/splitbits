import { service } from './modules';

const relationship = async(endpoint, props, action, method = 'POST') => {
  const response = await service(endpoint, { method, body: JSON.stringify(props) });
  if (response && action) action(response);

  return response;
};

export default {

  async update(props = {}, action) {
    const { image, name } = props;
    const body = new FormData(); // eslint-disable-line

    if (image) {
      const uri = image.uri.split('.');
      const fileType = uri[uri.length - 1];
      body.append('image', {
        uri: image.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    if (name) body.append('name', name);

    const response = await service('device', { method: 'PUT', body }, true);
    if (response && action) action(response);

    return response;
  },

  search(query) {
    return service(`device/search?query=${query}`);
  },

  request(props = {}, action) {
    return relationship('device/request', props, action);
  },

  accept(props = {}, action) {
    return relationship('device/accept', props, action);
  },

  cancel(props = {}, action) {
    return relationship('device/cancel', props, action);
  },

  remove(props = {}, action) {
    return relationship('device/remove', props, action, 'DELETE');
  },

  settings(props = {}, action) {

  },
};
