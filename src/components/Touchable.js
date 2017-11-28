import React from 'react';
import {
  Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity,
} from 'react-native';

const iOS = Platform.OS === 'ios';

export default ({ raised, ...props }) => { //eslint-disable-line
  if (raised) return <TouchableOpacity {...props} />;

  return iOS ? <TouchableHighlight {...props} /> : <TouchableNativeFeedback {...props} />;
};
