import { string, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { STYLE } from '../../../config';
import { Icon, Touchable } from '../../../components';
import styles from './FooterOption.style';

const FooterOption = ({ caption, icon, onPress }) => (
  <Touchable onPress={onPress} activeOpacity={0.95}>
    <View style={[STYLE.CENTERED, styles.container]}>
      <Icon value={icon} style={[styles.icon]} />
      <Text style={[styles.caption]}>{caption}</Text>
    </View>
  </Touchable>
);

FooterOption.propTypes = {
  caption: string,
  icon: string,
  onPress: func,
};

FooterOption.defaultProps = {
  caption: undefined,
  icon: undefined,
  onPress: undefined,
};

export default FooterOption;
