import { Dimensions, Platform } from 'react-native';

export default () => {
  const { height, width } = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};
