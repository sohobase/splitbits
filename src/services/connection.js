import { NetInfo, Platform } from 'react-native';

import { C } from '../config';

const { CONNECTION: { CELLULAR, WIFI } } = C;
const onConnection = type => (
  [CELLULAR, WIFI].includes(type) ? type : undefined
);

export default {
  get() {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        NetInfo.removeEventListener('connectionChange');
        NetInfo.addEventListener('connectionChange', ({ type }) => resolve(onConnection(type)));
      } else {
        NetInfo.getConnectionInfo().then(({ type }) => resolve(onConnection(type)));
      }
    });
  },

  listen(callback) {
    if (Platform.OS === 'ios') {
      NetInfo.removeEventListener('connectionChange');
      NetInfo.addEventListener('connectionChange', ({ type }) => callback(onConnection(type)));
    }
  },
};
