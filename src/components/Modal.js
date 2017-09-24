import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { Modal as ReactNativeModal, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../config';
import Button from './Button';
import styles from './Modal.style';

const { ANIMATION } = THEME;

const Modal = ({ children, onClose, title, visible }) => (
  <ReactNativeModal
    transparent
    visible={visible}
    onRequestClose={() => { }}
  >
    <Animatable animation="fadeIn" duration={ANIMATION.DURATION} style={styles.container}>
      <Animatable
        animation="bounceInUp"
        delay={ANIMATION.DURATION}
        duration={ANIMATION.DURATION}
        easing={ANIMATION.EASING}
        style={styles.content}
      >
        <View style={[STYLE.ROW, STYLE.CENTERED, styles.header]}>
          { title && <Text style={styles.title}>{title}</Text> }
          <Button icon="close" onPress={onClose} style={styles.close} />
        </View>
        { children }
      </Animatable>
    </Animatable>
  </ReactNativeModal>
);

Modal.propTypes = {
  children: node,
  onClose: func,
  title: string,
  visible: bool,
};

Modal.defaultProps = {
  children: undefined,
  onClose: undefined,
  title: undefined,
  visible: false,
};

export default Modal;
