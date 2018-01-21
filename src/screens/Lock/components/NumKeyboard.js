import { func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';

import { STYLE } from '../../../config';
import { Icon, Touchable } from '../../../components';
import styles from './NumKeyboard.style';

const BACKSPACE = 'backspace';
const HELP = 'help';
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, HELP, 0, BACKSPACE];

const NumKeyboard = ({ onPress }) => (
  <Motion animation="bounceInUp" delay={200}>
    <View style={[STYLE.ROW, styles.container]}>
      { KEYS.map(key => (
        <Touchable key={key} onPress={() => onPress(key)} raised style={[STYLE.CENTERED, styles.key]}>
          { [BACKSPACE, HELP].includes(key)
            ? <Icon value={key} style={styles.icon} />
            : <Text style={styles.number}>{key}</Text>
          }
        </Touchable>))}
    </View>
  </Motion>
);

NumKeyboard.propTypes = {
  onPress: func,
};

NumKeyboard.defaultProps = {
  onPress() {},
};

export default NumKeyboard;
