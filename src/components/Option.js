import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { STYLE } from '../config';
import Icon from './Icon';
import Touchable from './Touchable';
import styles from './Option.style';

const Option = ({
  activity, caption, centered, disabled, icon, image, onPress, style, hint,
}) => (
  <Touchable onPress={!disabled ? onPress : undefined} raised>
    <View style={[styles.option, (centered ? STYLE.CENTERED : [STYLE.ROW, styles.row]), (disabled && styles.disabled), style]}>
      { image && <Image source={image} style={styles.image} /> }
      { icon && <Icon value={icon} style={[styles.icon, (!disabled && !centered && styles.iconAccent)]} /> }
      { activity && <View style={styles.activity} />}
      <View style={!centered && icon && styles.texts}>
        <Text style={[centered ? styles.text : styles.caption]}>{caption}</Text>
        { hint && <Text style={styles.text}>{hint}</Text> }
      </View>
    </View>
  </Touchable>
);

Option.propTypes = {
  activity: bool,
  caption: string,
  centered: bool,
  disabled: bool,
  hint: string,
  icon: string,
  image: number,
  onPress: func,
  style: oneOfType([array, number]),
};

Option.defaultProps = {
  activity: false,
  caption: undefined,
  centered: false,
  disabled: false,
  hint: undefined,
  icon: undefined,
  image: undefined,
  onPress: undefined,
  style: undefined,
};

export default Option;
