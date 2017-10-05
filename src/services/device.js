import { service } from './modules';

export default {

  async update(props = {}, action) {
    const { image, name } = props;
    const body = new FormData() // eslint-disable-line
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
    const response = await service('device', { method: 'PUT', body });
    if (response) action(response);
  },

  add(data) {

  },

  remove(data) {

  },

  settings(data) {

  },
};
