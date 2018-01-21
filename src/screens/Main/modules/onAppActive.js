import { NavigationActions } from 'react-navigation';

import { C } from '../../../config';

const { STATE: { ACTIVE } } = C;
const LIMIT_SECONDS_IN_BACKGROUND = 60;
let lastActivity;

export default ({ navigation }, state) => {
  if (!lastActivity) lastActivity = new Date();

  if (state === ACTIVE) {
    const seconds = parseInt((new Date() - lastActivity) / 1000, 10);
    if (seconds > LIMIT_SECONDS_IN_BACKGROUND) {
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Lock' })],
      }));
    }
    lastActivity = 0;
  }
};
