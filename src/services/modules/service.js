import { C } from '../../config';

const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  deviceId,
  token: deviceId,
  testnet: C.DEV,
};
const onError = error => console.log('module/service', error);

export default async(endpoint, props = {}, multipart = false) => {
  const { method = 'GET' } = props;

  if (multipart) headers['Content-Type'] = 'multipart/form-data';

  const response = await fetch(`${C.SERVICE}${endpoint}`, { headers, ...props, method }).catch(onError); // eslint-disable-line
  if (!response) return undefined;

  const json = await response.json();
  if (response.status >= 400) {
    console.log('@TODO', json); // @TODO: Send to redux an error
    return undefined;
  }

  return json;
};
