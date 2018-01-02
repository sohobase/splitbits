import { service } from './modules';

const relationship = async(endpoint, props, action, method = 'POST') => {
  const response = await service(endpoint, { method, body: JSON.stringify(props) });
  if (response && action) action(response);

  return response;
};

export default {

  async update({
    currency, image, language, name, trend,
  }) {
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
    if (currency) body.append('currency', currency);
    if (language) body.append('language', language);
    if (name) body.append('name', name);
    if (trend) body.append('trend', trend);

    return service('device', { method: 'PUT', body }, true);
  },

  search(query) {
    return service(`device/search?query=${query}`);
  },

  state() {
    return service('device/state');
  },

  request(props = {}, action) {
    return relationship('device/request', props, action);
  },

  qr(props = {}, action) {
    return relationship('device/qr', props, action);
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
};
