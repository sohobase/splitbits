import { NavigationActions } from 'react-navigation';
import { C } from '../../../config';

const { STATE: { ACTIVE } } = C;

export default ({ navigation }, state) => {
  if (state === ACTIVE) {
    navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Lock' })],
    }));
  }
};
