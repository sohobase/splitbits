import { C } from '../../config';

const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  deviceId,
};
const onError = error => console.log('module/service', error);

export default async(endpoint, props) => {
  const response = await fetch(`${C.SERVICE}${endpoint}`, { headers, ...props }).catch(onError); // eslint-disable-line 
  const json = response ? await response.json() : undefined;

  return json;
};
