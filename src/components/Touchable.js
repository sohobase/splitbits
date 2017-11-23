import React from 'react';
import {
  Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity,
} from 'react-native';

const iOS = Platform.OS === 'ios';

export default ({ raised, ...props }) => { //eslint-disable-line
  if (iOS && raised) return <TouchableOpacity {...props} />;
  return (
    (Platform.OS === 'ios')
      ? <TouchableHighlight {...props} />
      : <TouchableNativeFeedback {...props} />
  );
};
