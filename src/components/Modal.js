import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { KeyboardAvoidingView, Modal as ReactNativeModal, Platform, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';

import { STYLE, THEME } from '../config';
import Button from './Button';
import styles from './Modal.style';

const { ANIMATION: { DURATION } } = THEME;

const Modal = ({
  children, hint, onClose, title, visible,
}) => (
  <ReactNativeModal transparent visible={visible} onRequestClose={onClose}>
    <Motion
      animation={visible ? 'fadeIn' : 'fadeOut'}
      delay={visible ? 0 : DURATION / 2}
      duration={DURATION / 2}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
        <Motion
          animation={visible ? 'bounceInUp' : 'bounceOutDown'}
          duration={DURATION}
          style={[STYLE.ELEVATION, styles.content]}
        >
          <View style={styles.header}>
            { title && <Text style={styles.title}>{title}</Text> }
            <Button
              icon="close"
              onPress={onClose}
              raised
              style={styles.button}
              captionStyle={styles.buttonCaption}
            />
          </View>
          { hint && <Text style={styles.hint}>{hint}</Text> }
          { children }
        </Motion>
      </KeyboardAvoidingView>
    </Motion>
  </ReactNativeModal>
);

Modal.propTypes = {
  children: node,
  hint: string,
  onClose: func,
  title: string,
  visible: bool,
};

Modal.defaultProps = {
  children: undefined,
  hint: undefined,
  onClose: undefined,
  title: undefined,
  visible: false,
};

export default Modal;
