import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../config';
import Icon from './Icon';
import Touchable from './Touchable';
import styles from './Option.style';

const Option = ({ caption, centered, icon, onPress, style, hint }) => (
  <Touchable onPress={onPress} activeOpacity={0.95}>
    <View style={[styles.option, (centered ? STYLE.CENTERED : STYLE.ROW), style]}>
      { icon && <Icon value={icon} style={[styles.icon, (!centered && styles.iconAccent)]} /> }
      <View style={!centered && icon && styles.texts}>
        <Text style={[centered ? styles.text : styles.caption]}>{caption}</Text>
        { hint && <Text style={styles.text}>{hint}</Text> }
      </View>
    </View>
  </Touchable>
);

Option.propTypes = {
  caption: string,
  centered: bool,
  hint: string,
  icon: string,
  onPress: func,
  style: oneOfType(array, number),
};

Option.defaultProps = {
  caption: undefined,
  centered: false,
  hint: undefined,
  icon: undefined,
  onPress: undefined,
  style: undefined,
};

export default Option;
