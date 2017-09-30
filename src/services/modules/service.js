import { C } from '../../config';

const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  deviceId,
};

export default async(endpoint, props) => {
  const response = await fetch(`${C.SERVICE}${endpoint}`, { // eslint-disable-line
    headers,
    ...props,
  });
  const json = await response.json();

  return json;
};
