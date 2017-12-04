import { C } from '../../../config';

const { STATE: { ACTIVE } } = C;

export default ({ navigation }, state) => {
  if (state === ACTIVE) navigation.navigate('Lock');
};
