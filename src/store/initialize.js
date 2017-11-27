import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import storage from 'redux-persist/es/storage';
import { C } from '../config';
import reducer from './reducer';

const { SERVICE } = C;

const config = {
  key: SERVICE,
  rehydrated: true,
  storage,
  version: 2,
};

export default () => {
  const store = createStore(persistReducer(config, reducer));
  persistStore(store);

  return store;
};
