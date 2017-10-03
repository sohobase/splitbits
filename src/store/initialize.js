import { AsyncStorage } from 'react-native';
import { compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reducer from './reducer';

export default () => {
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
      },
      () => resolve(store),
    );
  });
};
