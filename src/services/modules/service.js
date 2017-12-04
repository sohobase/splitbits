import { C } from '../../config';
import { instance } from '../../store';
import { errorAction } from '../../store/actions';

const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  deviceId,
  token: deviceId,
  testnet: C.DEV,
};
const onError = (error = {}) => {
  const { dispatch } = instance.get();
  dispatch(errorAction(error));
};

export default async(endpoint, props = {}, multipart) => {
  const { method = 'GET' } = props;

  const response = await fetch(`${C.SERVICE}${endpoint}`, { // eslint-disable-line
    headers: {
      ...DEFAULT_HEADERS,
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
    },
    ...props,
    method,
  }).catch(onError, endpoint);
  if (!response) return undefined;

  const json = await response.json();
  if (response.status >= 400) {
    const { dispatch } = instance.get();
    dispatch(errorAction({ ...json, code: response.status }));
    return undefined;
  }

  return json;
};
