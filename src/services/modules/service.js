import { C, TEXT } from '../../config';
import { instance } from '../../store';
import { errorAction } from '../../store/actions';

const { EN: { ERROR_CONNECTION } } = TEXT;
const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  deviceId,
  token: deviceId,
  testnet: C.DEV,
};

const TIMEOUT = 10000;
const onError = (error = {}, reject) => {
  const { dispatch } = instance.get();

  dispatch(errorAction(error));
  reject(error);
};

export default async(endpoint, props = {}, multipart) => {
  const { method = 'GET' } = props;
  const headers = {
    ...DEFAULT_HEADERS,
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  };

  return new Promise(async(resolve, reject) => {
    const timeout = setTimeout(() => onError(new Error(ERROR_CONNECTION), reject), TIMEOUT);

    const response = await fetch(`${C.SERVICE}${endpoint}`, { headers, ...props, method }) // eslint-disable-line
      .catch(error => onError(error, reject));

    if (response && response.json) {
      clearTimeout(timeout);
      const json = await response.json();
      if (response.status >= 400) onError({ ...json, code: response.status }, reject);
      resolve(json);
    }
  });
};
