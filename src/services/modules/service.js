import { C, TEXT } from '../../config';
import { instance } from '../../store';
import { errorAction } from '../../store/actions';

const { DEV, TIMEOUT_SERVICE } = C;
const { EN: { ERROR_CONNECTION } } = TEXT;
const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  deviceId,
  token: deviceId,
  testnet: DEV,
  timeout: TIMEOUT_SERVICE,
};

export default async(endpoint, props = {}, multipart) => {
  const { method = 'GET' } = props;
  const { dispatch } = instance.get();
  const headers = {
    ...DEFAULT_HEADERS,
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  };

  return new Promise((resolve) => {
    fetch(`${C.SERVICE}${endpoint}`, { headers, ...props, method })  // eslint-disable-line
      .then((response) => {
        const json = response.json();
        if (response.status >= 400) {
          const error = new Error();
          error.response = response;
          error.message = json.message;
          throw error;
        }
        return resolve(json);
      }).catch((error = {}) => {
        if (!error.response) error.message = ERROR_CONNECTION; //eslint-disable-line

        dispatch(errorAction({
          code: error.response ? error.response.status : undefined,
          endpoint,
          props,
          message: error.message,
        }));

        return resolve(undefined); // eslint-disable-line
      });
  });
};
