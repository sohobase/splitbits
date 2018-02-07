import { bool } from 'prop-types';
import React from 'react';
import { Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';


const Touchable = ({ raised, ...props }) => {
  if (raised) return <TouchableOpacity {...props} />;

  return Platform.OS === 'ios'
    ? <TouchableHighlight underlayColor="rgba(0,0,0,0.15)" activeOpacity={0.85} {...props} />
    : <TouchableNativeFeedback useForeground {...props} />;
};

Touchable.propTypes = {
  raised: bool,
};

Touchable.defaultProps = {
  raised: false,
};

export default Touchable;
