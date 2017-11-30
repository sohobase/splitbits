import { C } from '../../config';

const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  deviceId,
  token: deviceId,
  testnet: C.DEV,
};
const onError = error => console.log('module/service', error);

export default async(endpoint, props = {}, multipart) => {
  const { method = 'GET' } = props;

  const response = await fetch(`${C.SERVICE}${endpoint}`, { // eslint-disable-line
    headers: {
      ...DEFAULT_HEADERS,
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
    },
    ...props,
    method,
  }).catch(onError); // eslint-disable-line
  if (!response) return undefined;

  const json = await response.json();
  if (response.status >= 400) {
    console.log('@TODO', json); // @TODO: Send to redux an error
    return undefined;
  }

  return json;
};
