import { AsyncStorage } from 'react-native';
import { compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import reducer from './reducer';

const { Constants: { deviceId = 'unknown' } } = Expo || {};// eslint-disable-line

export default () => {
  const encryptor = createEncryptor({
    secretKey: deviceId,
  });
  return new Promise((resolve) => {
    const store = createStore(
      reducer,
      undefined,
      compose(
        autoRehydrate(),
      ),
    );

    persistStore(
      store,
      {
        storage: AsyncStorage,
        transforms: [
          encryptor,
        ],
      },
      () => resolve(store),
    );
  });
};
