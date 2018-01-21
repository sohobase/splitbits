import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import storage from 'redux-persist/es/storage';

import { C } from '../config';
import reducer from './reducer';
import instance from './instance';

const { DEV, SERVICE } = C;

const config = {
  // key: SERVICE,
  key: DEV ? 'localhost' : SERVICE,
  rehydrated: true,
  storage,
  version: 2,
};

export default async() =>
  new Promise((resolve) => {
    const store = createStore(persistReducer(config, reducer));
    persistStore(store, null, () => {
      instance.set(store);
      resolve(store);
    });
  });
