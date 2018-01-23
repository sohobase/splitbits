import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

export default ({ raised, ...props }) => { //eslint-disable-line
  if (raised) return <TouchableOpacity {...props} />;

  return Platform.OS === 'ios'
    ? <TouchableHighlight underlayColor="rgba(0,0,0,0.15)" activeOpacity={0.85} {...props} />
    : <TouchableNativeFeedback useForeground {...props} />;
};
